const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// 11ty configuration
module.exports = (config) => {
  config.addPlugin(eleventyNavigationPlugin);
  config.addPassthroughCopy("src/css");

  //   config.addFilter("getContent", (data, { type }) => {
  //     return data.bucket.objects
  //       .filter((bucket) => bucket.type_slug === type)
  //       .map((bucket) => bucket.content);
  //   });

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
