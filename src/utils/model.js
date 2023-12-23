export const uuid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};
export const addNode = (key, data, newData, isLeaf) => {
  data.forEach((i) => {
    if (i.key === key) {
      i?.children
        ? i.children.push({
            title: newData,
            key: uuid(),
            isLeaf,
          })
        : (i.children = [{ title: newData, key: uuid(), isLeaf }]);
    } else if (i?.children?.length) {
      addNode(key, i.children, newData, true);
    }
  });
  return data;
};
export const addData = (key, data, newData) => {
  data.forEach((i) => {
    if (i.key === key) {
      i?.data
        ? i.data.push({
            title: newData,
            key: uuid(),
          })
        : (i.data = [{ title: newData, key: uuid() }]);
    } else if (i?.children?.length) {
      addData(key, i.children, newData);
    }
  });
  return data;
};
export const updateName = (key, data, newData) => {
  data.forEach((i) => {
    if (i.key === key) {
      i.title = newData;
    } else if (i?.children?.length) {
      updateName(key, i.children, newData);
    }
  });
  return data;
};

export const deleteNode = (key, data) => {
  data.forEach((i, index) => {
    if (i.key === key) {
      data.splice(index, 1);
    } else if (i?.children) {
      deleteNode(key, i.children);
    }
  });
  return data;
};
export const updateData = (key, data, children, text, html, name) => {
  data.forEach((i, index) => {
    if (i.key === key && i.data) {
      if (name == "delete") {
        i.data.splice(index, 1);
      } else {
        i.data.forEach((j) => {
          if (j.key == children.key) {
            j.text = text;
            j.html = html;
          }
        });
      }
    } else if (i?.children?.length) {
      updateData(key, i.children, children, text, html, name);
    }
  });
  return data;
};

export const getData = (key, data) => {
  let filterData = undefined;
  data.forEach((i) => {
    if (i.key === key) {
      filterData = i;  
      return;
    } else if (i?.children?.length) {
      filterData = getData(key, i.children);
    }
  });
  return filterData ?? {};
};
