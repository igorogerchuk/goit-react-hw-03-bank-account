const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

const get = key => {
  try {
    const accountState = localStorage.getItem(key);
    return accountState ? JSON.parse(accountState) : null;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export default {
  save,
  get,
};
