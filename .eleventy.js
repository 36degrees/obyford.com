const { DateTime } = require("luxon")
const fs = require("fs")
const leeFilters = require('./_data/leeFilters.json')
const anchor = require("markdown-it-anchor")

module.exports = function(config) {
  config.addPlugin(require("@11ty/eleventy-plugin-rss"))
  config.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"))
  config.setDataDeepMerge(true)

  config.addWatchTarget("sass/");

  config.addLayoutAlias("base", "layouts/base.njk")
  config.addLayoutAlias("post", "layouts/post.njk")

  /* Shortcodes */
  config.addShortcode('lee', filterId => {
    if (leeFilters.hasOwnProperty(filterId)) {
      return `${leeFilters[filterId].name} (<span class="swatch" style="background-color: ${leeFilters[filterId].hex}"></span> L${filterId})`
    }
  })

  /* Filters */

  config.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy")
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  config.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd')
  })

  // Get the first `n` elements of a collection.
  config.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  config.addPassthroughCopy("img")
  config.addPassthroughCopy("css")

  config.addPassthroughCopy("_redirects");

  /* Markdown */

  const markdownOptions = {
    html: true,
    linkify: false,
    typographer: true
  }

  const markdown = require("markdown-it")(markdownOptions)
    .use(anchor, {
      permalink: anchor.permalink.headerLink({
        class: 'direct-link'
      }),
      tabIndex: false
    })
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-abbr'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-table-of-contents'))

  config.setLibrary("md", markdown)

  /* BrowserSync */

  config.setBrowserSyncConfig({
    ghostMode: false,
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html')

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404)
          res.end()
        })
      }
    }
  })

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  }
}
