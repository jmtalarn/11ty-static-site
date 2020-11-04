const { PurgeCSS } = require("purgecss");

// 11ty configuration
module.exports = (config) => {
  config.addPassthroughCopy("src/css");

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
