const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const cosmicDataNavigationItem = require("./filters/navigation/cosmicdata");

// 11ty configuration
module.exports = (config) => {
  config.addPlugin(eleventyNavigationPlugin);
  config.addTemplateFormats(["css"]);
  // as CSS Is not a recognized template file extension it will copy it to the output.
  // config.addPassthroughCopy("src/css");
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
