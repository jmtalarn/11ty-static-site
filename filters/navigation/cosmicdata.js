module.exports = (data) => {
  return data.map((item) => {
    const {
      template: {
        paginationData: { bucket },
      },
    } = item;

    return {
      key: bucket.slug,
      title: bucket.title,
      order: bucket.order,
      url: `/${bucket.slug}`,
      pluginType: "eleventy-navigation",
    };
  });
};
