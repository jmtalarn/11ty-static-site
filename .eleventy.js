const { PurgeCSS } = require("purgecss");

// 11ty configuration
module.exports = (config) => {
  config.addPassthroughCopy("src/css");

  //   config.addTransform("purge-and-inline-css", async (content, outputPath) => {
  //     if (
  //       process.env.ELEVENTY_ENV !== "production" ||
  //       !outputPath.endsWith(".html")
  //     ) {
  //       return content;
  //     }

  //     const purgeCSSResults = await new PurgeCSS().purge({
  //       content: [{ raw: content }],
  //       css: ["build/css/style.css"],
  //       keyframes: true,
  //     });

  //     return content.replace(
  //       "<!-- INLINE CSS-->",
  //       "<style>" + purgeCSSResults[0].css + "</style>"
  //     );
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
