module.exports = (data) => {
  if (data) {
    console.log(data);
    return `<a href="${data.url}">${data.title}</a>`;
  }
  return data;
};
