const getCachedState = (key) => {
  const cachedState =
    localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
  console.log({ cache: JSON.parse(localStorage.getItem(key)) });
  return cachedState;
};

export default getCachedState;
