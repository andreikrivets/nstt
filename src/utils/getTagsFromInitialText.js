export default (data) => {
  const dataWithTags = data.map((note) => {
    const curentTextTags = note.text.match(/#\w+/g) || [];
    return { ...note, tags: [...curentTextTags] };
  });
  return dataWithTags;
};
