---
title: Testing Sass with Jest
description: How to test Sass compilation, enforcing good hygiene and testing Sass functions and mixins using Jest
date: 2020-05-11
---

Having well-tested code helps you find bugs easily, and gives you the confidence to be able to make and ship changes whilst knowing that you (probably) haven't broken anything.{.paragraph--lead}

In [GOV.UK Frontend], a lot of the logic that we care about is in our [Sass], so we've found some techniques that we can use to test our Sass using [Jest]. I thought I'd write them up here in case they're useful to someone else.

You can find a repo with working examples on GitHub at [36degrees/sass-jest-examples]. I've also provided links to the GOV.UK Frontend repo that show how we're applying these techniques there.

All of these examples assume that you're using [node-sass].

---

First, let's create a helper which wraps up `sass.render` into a [Promise] with some sensible default config, in a function which we can include from our tests:

```javascript
// helpers.js
const util = require('util')

const sass = require('node-sass')
const sassRender = util.promisify(sass.render)

module.exports.render = (options) => {
  return sassRender({
    // Where node-sass should look for files when you use @import
    includePaths: ['./sass'],

    // Using a compact output style allows you to use concise 'expected' CSS
    outputStyle: 'compact',

    // Merge in any other options you pass when calling render
    ...options
  })
}
```

## Testing that your Sass compiles without errors

As a basic example, we can now use our `render` helper from within a test to check that our Sass compiles without errors:

```javascript
const { render } = require('./helpers')

describe('sass/index.scss', () => {
  it('compiles to CSS', () => {
    return render({
      file: 'sass/index.scss'
    })
  })
})
```

It's likely that you already compile your Sass to CSS somewhere in your build pipeline, and so checking that it compiles in your tests may not be that useful.

However, if you're building a Sass library for others to use, you may want to check that your Sass can be imported in different ways.

For example, we can (ab)use [glob] and [it.each] to check that each of our components can be compiled individually:

```javascript
const glob = require('glob')

const { render } = require('./helpers')

describe('sass/components/', () => {
  const components = glob.sync('sass/components/*.scss')

  it.each(components)('%s compiles to CSS', (file) => {
    return render({ file })
  })
})
```

Now, if any of the component files fails to compile, the test will fail and the error message will appear in the test output:

```text
sass/components/ › sass/components/_diamond.scss compiles to CSS

    Undefined variable: "$background-color".
```

We use this technique in GOV.UK Frontend to [test that every component can be imported individually](https://github.com/alphagov/govuk-frontend/blob/fdf2ebe44d9a0065702dac101fe2c69790806056/src/govuk/components/all.test.js#L26-L30).


## Enforcing good Sass hygiene

If you're following a particular architecture like ITCSS, or otherwise structuring your Sass in different layers, you can write tests to enforce good hygiene – for example, you can test that a given file or layer does not output any CSS if it's compiled by itself:

```javascript
const { render } = require('./helpers')

describe('sass/_settings.scss', () => {
  it('does not output CSS', async () => {
    return render({
      file: 'sass/_settings.scss'
    }).then(output => {
      expect(output.css.toString()).toEqual('')
    })
  })
})
```

We use this technique in GOV.UK Frontend to [test that some layers, like the settings layer, do not output any CSS](https://github.com/alphagov/govuk-frontend/blob/fdf2ebe44d9a0065702dac101fe2c69790806056/src/govuk/settings/settings.test.js#L13-L18).


## Testing Sass functions

Let's write some tests for this somewhat contrived example Sass function, which takes a number and halves it:

```scss
@function half($number) {
  @if not (type-of($number) == 'number') {
    @error "Cannot half something which is not a number!";
  }

  @if ($number % 2 > 0) {
    @warn "Halving #{$number} returns a non-whole number";
  }

  @return $number / 2;
}
```

We can write a small snippet of Sass which imports and calls the function, and then render it, asserting what we expect the resulting CSS to look like:

```javascript
const { render } = require('./helpers')

it('halves a given even number', async () => {
  const data = `
    @import "functions/half";

    .foo {
      width: half(10px);
    }
  `

  return render({ data }).then(output => {
    expect(output.css.toString().trim()).toBe('.foo { width: 5px; }')
  })
})
```

Our `half` function triggers an error if you try and pass it something that's not a number.

We can test this by calling it with a string, and then expecting the render [Promise] to be rejected:

```javascript
const { render } = require('./helpers')

it('errors when trying to half something that is not a number', async () => {
  const data = `
    @import "functions/half";

    .foo {
      width: half("trollolol");
    }
  `

  return expect(render({ data })).rejects.toThrow(
    'Cannot half something which is not a number!'
  )
})
```

Testing warnings is a little more complicated, as the Sass will compile just fine, and the warnings don't appear in the compiled CSS.

Instead, we create a [mock function] which we can use to overload the built-in `@warn` function, and then assert that it was called with a specific warning message:

```javascript
const sass = require('node-sass')

const { render } = require('./helpers')

it('warns when result is not a whole number', async () => {
  const data = `
    @import "functions/half";

    .foo {
      width: half(9px);
    }
  `

  // Create a mock warn function that we can use to override the native @warn
  // function, that we can make assertions about post-render.
  const mockWarnFunction = jest.fn()
    .mockReturnValue(sass.NULL)

  return render({
    data,
    functions: {
      '@warn': mockWarnFunction
    }
  }).then(() => {
    // Expect our mocked @warn function to have been called once with a single
    // argument, which should be the deprecation notice
    return expect(mockWarnFunction.mock.calls[0][0].getValue())
      .toEqual('Halving 9px returns a non-whole number')
  })
})
```

We use tests for functions and mixins for the helpers and tools in GOV.UK Frontend, like [our colour helpers](https://github.com/alphagov/govuk-frontend/blob/fdf2ebe44d9a0065702dac101fe2c69790806056/src/govuk/helpers/colour.test.js).

We also add [tests for warnings when we deprecate things](https://github.com/alphagov/govuk-frontend/blob/f8a0a1dc4da5f7fc1d915ddce06a1ee5c62cdaac/src/govuk/core/core.test.js).

## Testing Sass mixins

We can test mixins using the same technique we use to test functions. Let's imagine we have this questionable mixin that we want to test:

```scss
@mixin enhance {
  font-family: 'Comic Sans MS' !important;
  color: hotpink !important;
}
```

Again, we write a some Sass which imports and includes the mixin, render it, and assert what we expect the CSS to look like:

```javascript
const { render } = require('./helpers')

describe('mixins/_enhance.scss', () => {
  it('makes everything 200% more awesome', async () => {
    const data = `
      @import "mixins/enhance";

      .foo {
        @include enhance;
      }
    `

    return render({ data }).then(output => {
      expect(output.css.toString().trim())
        .toBe(".foo { font-family: 'Comic Sans MS' !important; color: hotpink !important; }")
    })
  })
})
```

---

If you end up using any of these techniques in your own code, please [let me know](http://twitter.com/36degrees)!

[Sass]: https://sass-lang.com/
[Jest]: https://jestjs.io/
[GOV.UK Frontend]: https://github.com/alphagov/govuk-frontend
[36degrees/sass-jest-examples]: https://github.com/36degrees/sass-jest-examples
[node-sass]: https://www.npmjs.com/package/node-sass
[glob]: https://www.npmjs.com/package/glob
[it.each]: https://jestjs.io/docs/en/api#testeachtablename-fn-timeout
[mock function]: https://jestjs.io/docs/en/mock-functions.html
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
