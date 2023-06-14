const isEscEvent = (e) => {
  return e.key === 'Escape' || e.key === 'Esc';
};

const isEnterEvent = (e) => {
  return e.key === 'Enter';
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, timeoutDelay);
  };
};


export {
  isEscEvent,
  isEnterEvent,
  debounce
};
