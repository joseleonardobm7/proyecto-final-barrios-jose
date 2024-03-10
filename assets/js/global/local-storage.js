const setLocalStorage = (container, value) => {
  localStorage.setItem(container, JSON.stringify(value));
};
const getLocalStorage = (container) => {
  return JSON.parse(localStorage.getItem(container));
};

// FUNCIONES A UTILIZAR
export default {
  setLocalStorage,
  getLocalStorage,
};
