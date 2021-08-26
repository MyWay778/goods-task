const sortFunctions = {
  max: (a, b) => Number(b.price) - Number(a.price),
  min: (a, b) => Number(a.price) - Number(b.price),
  name: (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  },
};

export default sortFunctions;
