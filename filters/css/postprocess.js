const postcss = require("postcss");
const cleancss = require("postcss-clean");
const autoprefixer = require("autoprefixer");
const { PurgeCSS } = require("purgecss");

exports.purgeCssTransform = async (content, outputPath) => {
  if (
    process.env.ELEVENTY_ENV !== "production" ||
    !outputPath.endsWith(".html")
  ) {
    return content;
  }
  const pattern = /<style>(.*?)<\/style>/s;

  const rawCss = pattern.exec(content)[1].trim();

  const purgeCSSResults = await new PurgeCSS().purge({
    content: [{ raw: content.replace(pattern, ""), extension: "html" }],
    css: [{ raw: rawCss }],
    keyframes: true,
  });

  return content.replace(
    pattern,
    "<style>" + purgeCSSResults[0].css + "</style>"
  );
};
exports.cssMinFilter = function (code, callback) {
  postcss([
    autoprefixer,
    // purgecss({
    //   content: ["src/**/*.html", "src/**/*.njk", "src/**/*.md"],
    // }),
    cleancss(),
  ])
    .process(code)
    .then((result) => {
      result.warnings().forEach((warn) => {
        console.warn(warn.toString());
      });

      callback(null, result.css);
    })
    .catch((error) => console.error(error));
};
