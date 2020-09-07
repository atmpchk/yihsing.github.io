function groupBy(arr, prop) {
  return arr.reduce((groups, item) => {
    const key = item[prop];
    if (!groups[key]) {
      const newGroup = {};
      newGroup[key] = [];
      Object.assign(groups, newGroup);
    }
    groups[key].push(item);
    return groups;
  }, {});
}

export default groupBy;
