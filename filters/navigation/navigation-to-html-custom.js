module.exports = function navigationToHtml(pages, options = {}) {
  options = Object.assign(
    {
      listItemElement: "li",
      listItemClass: "",
      listItemHasChildrenClass: "",
      activeKey: "",
      activeListItemClass: "",
      anchorClass: "",
      activeAnchorClass: "",
      showExcerpt: false,
      isChildList: false,
    },
    options
  );

  let isChildList = !!options.isChildList;
  options.isChildList = true;

  let urlFilter = this.env.filters.url;
  //   if ("getFilter" in this) {
  //     // v0.10.0 and above
  //     urlFilter = this.getFilter("url");
  //   } else if ("nunjucksFilters" in this) {
  //     // backwards compat, hardcoded key
  //     urlFilter = this.nunjucksFilters.url;
  //   } else {
  //     // Theoretically we could just move on here with a `url => url` but then `pathPrefix`
  //     // would not work and it wouldn’t be obvious why—so let’s fail loudly to avoid that.
  //     throw new Error(
  //       "Could not find a `url` filter for the eleventy-navigation plugin in eleventyNavigationToHtml filter."
  //     );
  //   }

  if (pages.length && pages[0].pluginType !== "eleventy-navigation") {
    throw new Error(
      "Incorrect argument passed to eleventyNavigationToHtml filter. You must call `eleventyNavigation` or `eleventyNavigationBreadcrumb` first, like: `collection.all | eleventyNavigation | eleventyNavigationToHtml | safe`"
    );
  }

  return pages.length
    ? `${pages
        .map((entry) => {
          let liClass = [];
          let aClass = [];
          if (options.listItemClass) {
            liClass.push(options.listItemClass);
          }
          if (options.anchorClass) {
            aClass.push(options.anchorClass);
          }
          if (options.activeKey === entry.key) {
            if (options.activeListItemClass) {
              liClass.push(options.activeListItemClass);
            }
            if (options.activeAnchorClass) {
              aClass.push(options.activeAnchorClass);
            }
          }
          if (
            options.listItemHasChildrenClass &&
            entry.children &&
            entry.children.length
          ) {
            liClass.push(options.listItemHasChildrenClass);
          }
          return `<${options.listItemElement}${
            liClass.length ? ` class="${liClass.join(" ")}"` : ""
          }><a href="${urlFilter(entry.url)}"${
            aClass.length ? ` class="${aClass.join(" ")}"` : ""
          }>${entry.title}</a>${
            options.showExcerpt && entry.excerpt ? `: ${entry.excerpt}` : ""
          }${
            entry.children
              ? navigationToHtml.call(this, entry.children, options)
              : ""
          }</${options.listItemElement}>`;
        })
        .join("\n")}`
    : "";
};
