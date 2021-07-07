---
title: Everything you ever wanted to know about text decoration…
description: 
date: 2021-07-07
---

I recently had a lot of fun working on [some changes to the link styles on GOV.UK](#). Here's everything I learned about text decoration in the process.{.paragraph--lead}

![Screenshot showing the link styles before and after](/img/text-decoration/links-before-after.png){.img--border}

We made two subtle but important changes to links.

1. We moved underlines further away from the text, and made them consistently 1px thick, regardless of font size. This makes the link text easier to read, as the shape of each word is easier to discern.

2. We made the hover state clearer, by thickening the underline to 3px when a user hovers over the link. 

    This addresses [a usability issue originally raised in an audit]((https://github.com/alphagov/govuk-frontend/issues/1417#issue-450861994)) carried by the Digital Accessibility Centre way back in May 2019. They said:

    > &ldquo;The colour change when a user hovers over a link is not clear and this was especially difficult for low vision users to determine.
    > 
    > Ensuring that the state change is distinctive would benefit low vision users in particular, while benefiting all mouse users in general.&rdquo;

You might not think that moving an underline a few pixels and changing its thickness is particularly cutting-edge or interesting.

However it relies on two CSS properties, `text-decoration-thickness` and `text-underline-offset`, which have only recently been introduced to some browsers.

As a result, we had to spend some time understanding exactly how these new properties worked, and whether they were mature enough to use.

[[toc]]

## A quick primer on shorthand properties

Before we start digging in to the `text-decoration` property, it's useful to understand a few things about _shorthand properties_ in CSS.

Quoting heavily from the [excellent overview of shorthand CSS properties on MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties):

> Shorthand properties are CSS properties that let you set the values of multiple other CSS properties simultaneously.

> For instance, the CSS `background` property is a shorthand property that's able to define the values of `background-color`, `background-image`, `background-repeat`, and `background-position`.

Importantly, there's a 'tricky edge case' which is worth understanding – you'll see later how it affects `text-decoration`:

> A value which is not specified is set to its initial value. That sounds anecdotal, but it really means that it overrides previously set values. Therefore:
>
> ```css
> background-color: red;
> background: url(images/bg.gif) no-repeat left top;
> ```
> will not set the color of the background to `red` but to `background-color`'s default, `transparent`, as the second rule has precedence.

Throughout this article I'm also going to use the term 'longhand' to refer to properties that are not shorthand properties.

With that out the way, let take a brief trip back in time to see how the `text-decoration` property has changed.

## A brief history of `text-decoration`

### CSS 1 (1996) and CSS 2 (1998–2011)

In these earliest versions of CSS, [`text-decoration` was a longhand property](https://www.w3.org/TR/CSS2/text.html#lining-striking-props) that only accepted the values `none`, `underline`, `overline`, `line-through`, `blink`[^blink] and `inherit`:

```css
text-decoration: underline;
```

So, you could use it to add decoration to your text, but you had no control over its appearance – you were constrained to a solid line with its colour and thickness based on the text.

### CSS Text Decoration Module Level 3 (2019)

[CSS Text Decoration Module Level 3](https://www.w3.org/TR/css-text-decor-3/#line-decoration) introduced new `text-decoration-line`, `text-decoration-style` and `text-decoration-color` properties.

Now you could change the colour of the underline independently of the text colour, and choose between <span style="text-decoration: underline;">solid</span>, <span style="text-decoration: underline; text-decoration-style: double;">double</span>, <span style="text-decoration: underline; text-decoration-style: dotted;">dotted</span>, <span style="text-decoration: underline; text-decoration-style: dashed;">dashed</span> or <span style="text-decoration: underline; text-decoration-style: wavy;">wavy</span> lines:

```css
text-decoration-line: underline;
text-decoration-style: dotted;
text-decoration-color: navy;
```

But it also [transformed the existing `text-decoration` property into a shorthand property](https://www.w3.org/TR/css-text-decor-3/#text-decoration-style-property), allowing you to set line, style and color in a single declaration:

```css
text-decoration: navy dotted underline;
```

### CSS Text Decoration Module Level 4 (Working Draft)

[CSS Text Decoration Module Level 4](https://www.w3.org/TR/css-text-decor-4/), which is still a working draft, introduces the `text-decoration-thickness` and `text-underline-offset` properties, allowing you control over the thickness of the line and the offset of the line from the text baseline respectively:

```css
text-decoration-line: underline;
text-decoration-style: dotted;
text-decoration-color: navy;
text-decoration-thickness: 4px;
text-underline-offset: 0.1em;
```

Again, it changes the `text-decoration` shorthand property to include the new `text-decoration-thickness`.

However, the `text-underline-offset` property is intentionally excluded from the shorthand property, and has to be set separately:

```css
text-decoration: navy 4px dotted underline;
text-underline-offset: 0.1em;
```

[^blink]: The `blink`{.blink} value has since been [deprecated in CSS Text Decoration Module Level 3 in favour of animations](https://www.w3.org/TR/css-text-decor-3/#valdef-text-decoration-line-blink)


## Pitfalls and tips for using text decoration properties

### Supporting all browsers

Older browsers including all versions of Internet Explorer [only understand `text-decoration` as it was defined in CSS 2](https://caniuse.com/text-decoration).

If you use `text-decoration` as a shorthand property, Internet Explorer will ignore it completely:

```css
.link {
    /* Has no effect in IE11 or other browsers that do not
       support CSS Text Decoration Module Level 3 */
    text-decoration: navy 4px dotted underline;
}
```

You can set `text-decoration` twice, as recommended in the specification:

```css
.link {
    text-decoration: underline; /* CSS 2 */
    text-decoration: navy 4px dotted underline; /* CSS 4 */
}
```

However, not all browsers that support CSS Text Decoration Module Level 4 support the shorthand property – notably, Safari will ignore the second declaration even though it supports all of the properties individually[^safari-webkit-prefix].

[^safari-webkit-prefix]: It does recognise shorthand when set using the vendor-prefixed `-webkit-text-decoration` property, so this may be handled for you if you happen to be using autoprefixer or similar.

To get the best browser support, set `text-decoration` as a longhand property, then set the various text decoration sub-properties independently:

```css
.link {
    text-decoration: underline;
    text-decoration-color: navy;
    text-decoration-thickness: 4px;
    text-decoration-style: dotted;
}
```

### Avoiding undoing styles when using the shorthand property

Remember the ‘tricky edge case’ with shorthand properties that was mentioned earlier? If you set `text-decoration` after any of the `text-decoration-*` properties, all of those properties will be reset back to their initial value.

As an example, consider a modifier class that's designed to remove underlines from links, except when active or hovered over:

```scss
.link {
    text-decoration: underline;
    text-decoration-color: navy;
    text-decoration-thickness: 4px;
    text-decoration-style: dotted;
}

.link--no-underline:link,
.link--no-underline:visited {
    text-decoration: none;
}

.link--no-underline:hover,
.link--no-underline:active {
    text-decoration: underline;
}
```

The link will have no underline except when hovered or active, when you might reasonably expect it to have a 4px navy dotted underline.

But, in a browser that treats it as a shorthand property it's effectively the same as doing this:

```scss
.link {
    text-decoration: underline;
    text-decoration-color: navy;
    text-decoration-thickness: 4px;
    text-decoration-style: dotted;
}

.link--no-underline:link,
.link--no-underline:visited {
    text-decoration-line: none;
    text-decoration-thickness: initial;
    text-decoration-style: initial;
    text-decoration-color: initial;
}

.link--no-underline:hover,
.link--no-underline:active {
    text-decoration: underline;
    text-decoration-thickness: initial;
    text-decoration-style: initial;
    text-decoration-color: initial;
}
```

As a result, the thickness, colour and style are all reset to their initial user-agent defaults, and when hovering over our link we just get a boring default underline.

The exception to this is, once again, Safari, where `text-decoration` is not a shorthand property, and instead acts like a sort of alias for `text-decoration-line`. Unlike other browsers it *does not* set the other `text-decoration-*` properties back to `initial`.

One option is to set the `text-decoration-line` longhand property directly, like this:

```scss
.link {
    text-decoration: underline;
    text-decoration-color: navy;
    text-decoration-thickness: 4px;
    text-decoration-style: dotted;
}

.link--no-underline:link,
.link--no-underline:visited {
    text-decoration-line: none;
}

.link--no-underline:hover,
.link--no-underline:active {
    text-decoration-line: underline;
}
```

However, this won't remove the underline in browsers that only support the CSS 2 `text-decoration` property, like Internet Explorer, as they don't recognise `text-decoration-line`.

If that's something you care about, you could do this instead:

```css
.link--no-underline:not(:hover):not(:active) {
    text-decoration: none;
}
```

This is [exactly what we do on GOV.UK](https://github.com/alphagov/govuk-frontend/blob/4f71da655cab81cacded150d87e112c86c4ca277/src/govuk/helpers/_links.scss#L377-L396) and should work in all browsers except IE6-8 and Safari 3.1, which [do not support `:not()`](https://caniuse.com/mdn-css_selectors_not).

### Supporting users who change the font size in their browser

I mentioned in the introduction that we've made the link underlines consistently 1px thick, but that was a slight over-simplification.

If a user zooms their browser in, the underlines would scale accordingly. However, if a user has instead changed the font size in their browser, the underlines would remain 1px thick.

We were concerned that users who do this might not see the underline, so we made sure that the underlines scale appropriately by calculating the underline thickness in rem as well as pixels, and taking whichever value is bigger using the `max` function.

Diving 1px by 16px (the default font size in most browsers) gives us a value of 0.0625rem:

```css
.link {
  text-decoration-thickness: max(1px, .0625rem);
}
```

This means that underlines will always be at least 1px thick, but a user who sets the font size in their browser to 32px will see 2px underlines (because 32px × 0.0625 = 2px).

## Bugs and quirks

### Blink (Chromium, Chrome, Edge and Opera)

1. The `text-underline-offset` is calculated incorrectly.

   The spec says that the 'zero position' for the offset should be the text baseline, but instead the offset changes with the thickness of the underline – as you increase the thickness, it moves further away from the text:

   ![Screenshot showing links with different thickness underlines, with the offset of the underline from the text increasing with the thickness](/img/text-decoration/blink-underline-offset.png){.img--border}

   This means that offset is inconsistent with other browsers, and so we've ended up having to compromise on the offset value in order to get something that looks good everywhere.

   When this bug is fixed, all browsers should place the underline consistently, at which point we'll likely revisit the offset value again.

   ([Chromium bug #1172623](https://crbug.com/1172623))

2. Changes in text decoration within a multi-column layout are 'mis-painted' – hovering over one link in the columns causes other links to be (partially?) underlined:

   ![Screenshot showing links in 2 columns, with one link correctly underlined and several other links also partially underlined](/img/text-decoration/blink-mispaint.png){.img--border}
   
   I recommend playing with [the CodePen](https://codepen.io/36degrees/pen/gOgYJRv) in a Blink browser (or watching the video attached to the bug report), because I have no idea how to fully describe this rather funky bug.

   In GOV.UK Frontend, we decided to [disable the link hover state for links in the footer](https://github.com/alphagov/govuk-frontend/pull/2215/commits/8187b5733a767dfee5bff474010d8572abadac1b), which is the only component we ship that uses columns.
   
   This means there's a little inconsistency in the link styles across GOV.UK, but we're hoping this bug might get fixed soon… 🤞

   We also [flagged this issue in the release notes](https://github.com/alphagov/govuk-frontend/releases/tag/v3.12.0), and placed these new link styles behind a feature flag that individual teams needed to opt in to.

    ([Chromium bug #1190987](https://crbug.com/1190987), which we reported)

3. In Chrome 87–88, Edge 87–88 and Opera 73–74 (the first two versions after `text-decoration-thickness` was introduced), the `text-decoration-thickness` property does not work unless either:

   - `text-underline-offset` is set to something other than `auto`
   - `text-decoration-color` is set to something other than `currentColor`
  
   ([Chromium bug #1154537](https://crbug.com/1154537))


### Webkit (Safari, iOS browsers)

1. Dynamic changes in `text-decoration-thickness` (for example on hover) have no effect above certain font sizes, unless the link style changes in another way too.

   The affected font sizes seem to depend on the underline thickness. In our testing:
   
   - a 2px underline had no effect on text bigger than 15px
   - a 3px underline had no effect on text bigger than 19px
   - a 5px underline had no effect on text bigger than 27px

   You can work around this by also forcing a colour change – even a really subtle one – [which is what we're doing on GOV.UK](https://github.com/alphagov/govuk-frontend/pull/2183/commits/683591e5980fcc706caf21a9c7fe9bfe46fe85cf).

   ([Webkit bug #224483](https://bugs.webkit.org/show_bug.cgi?id=224483), which we reported)

2. Webkit's [ink skipping](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink) algorithm leaves increasingly large gaps around descenders as you make the underline thicker.

   When using a 3px underline, the extra space around the descenders is distracting enough that [we ended up disabling ink skipping on hover for GOV.UK](https://github.com/alphagov/govuk-frontend/pull/2251).

   Past a certain point, the underline on a word with multiple descenders can disappear entirely:

   ![Screenshot showing links with underlines of different thickness. Every link has the text 'Typography is joyous'. As the underlines get thicker, the gaps in the underline around the descenders get larger. For the thickest underline, only the last 3 letters of 'joyous' are underlined, as the rest of the underline has been skipped because of the descenders.](/img/text-decoration/ink-skip-dilation.png){.img--border}

   The [failing web platform test](https://wpt.fyi/results/css/css-text-decor/text-decoration-thickness-ink-skip-dilation.html?label=experimental&label=master&aligned) uses the term _dilation_ to describe this. I've no idea if that's a technical term for it or not…

   Blink browsers also seem to dilate [^dilate] the underline more than they need to as well, but not as badly as Webkit browsers do.

    ([Webkit bug #214464](https://bugs.webkit.org/show_bug.cgi?id=214464))

[^dilate]: See, I've already started using it like it's a proper term!

{# 🤫 #}

<style>
.blink:hover {
  animation: blink 1s steps(5, start) infinite;
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}
</style>
