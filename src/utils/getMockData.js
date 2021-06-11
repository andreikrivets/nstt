import faker from 'faker';

const getTags = (text = '') => text.match(/#\w+/g) || [];

export default () => {
  const id = faker.datatype.uuid();
  const title = faker.name.jobTitle();
  const text = faker.commerce.productDescription();
  // add a tag sign every 5 words
  const textWithTags = text
    .split(' ')
    .map((word, index) => (!(index % 5) ? `#${word}` : word))
    .join(' ');
  const tags = getTags(textWithTags);
  return { id, title, text: textWithTags, tags };
};
