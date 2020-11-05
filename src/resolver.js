(data) => {
  return data
    .filter((bucket) => bucket.type_slug === "sections")
    .map((bucket) => ({
      content: bucket.content,
      slug: bucket.slug,
      eleventyNavigation: {
        key: bucket.slug,
        title: bucket.title,
        order: bucket.order,
      },
    }));
};
