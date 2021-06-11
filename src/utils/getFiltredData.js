export default (data, tags) => {
  const filtredData = [];
  for (let i = 0; i < data.length; i += 1) {
    let counter = 0;
    if (data[i].tags.includes(tags[0])) {
      for (let j = 0; j < tags.length; j += 1) {
        if (data[i].tags.includes(tags[j])) counter += 1;
      }
    }
    if (counter === tags.length) filtredData.push(data[i]);
  }
  return filtredData;
};
