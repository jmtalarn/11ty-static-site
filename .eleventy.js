const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const cosmicDataNavigationItem = require("./filters/navigation/cosmicdata");
const ctaLink = require("./filters/navigation/cta-link");
const navigationToHtmlCustom = require("./filters/navigation/navigation-to-html-custom");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const xmlFiltersPlugin = require("eleventy-xml-plugin");

const {
  cssMinFilter,
  purgeCssTransform,
} = require("./filters/css/postprocess");

console.log({ environment: process.env.ELEVENTY_ENV });
// 11ty configuration
module.exports = (config) => {
  config.addPlugin(eleventyNavigationPlugin);
  config.addPlugin(pluginRss);
  config.addPlugin(xmlFiltersPlugin);
  //Copy files
  //config.addTemplateFormats(["css"]);
  // as CSS Is not a recognized template file extension it will copy it to the output.
  // config.addPassthroughCopy("src/css");

  //Adding asyncNunjuckAsyncFilter because is the only one which accepts async filters
  //https://github.com/11ty/eleventy/issues/518
  config.addNunjucksAsyncFilter("cssmin", cssMinFilter);

  //PurgeCss requires the final html so we need to run a transform

  config.addTransform("purge-styles", purgeCssTransform);

  config.addFilter("ctaLink", ctaLink);
  config.addFilter("eleventyNavigationToHtmlCustom", navigationToHtmlCustom);

  config.addPassthroughCopy({
    "./node_modules/@fortawesome/fontawesome-pro/js/all.min.js": "./js/fa.js",
  });
  // ADD a FILTER
  //   config.addFilter("getContent", (data, { type }) => {
  //     return data.bucket.objects
  //       .filter((bucket) => bucket.type_slug === type)
  //       .map((bucket) => bucket.content);
  //   });

  config.addFilter("cosmicDataNavigationItem", cosmicDataNavigationItem);
  return {
    dir: {
      input: "src",
      output: "build",
      includes: "_includes",
      layouts: "_layouts",
    },
    passthroughFileCopy: true,
  };
};
