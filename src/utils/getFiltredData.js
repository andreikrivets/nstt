export default (data, tags) => {
  const filtredData = data.filter((note) => {
    const isValid = tags.reduce((acc, tag) => {
      // eslint-disable-next-line no-param-reassign
      acc += note.tags.includes(tag);
      return acc;
    }, false);
    return isValid;
  });
  return filtredData;
};
