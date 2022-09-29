const getCachedState = (key) => {
  const cachedState =
    localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
  return cachedState;
};

export default getCachedState;
