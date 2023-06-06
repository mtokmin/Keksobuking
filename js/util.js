const isEscEvent = (e) => {
  return e.key === 'Escape' || e.key === 'Esc';
};

const isEnterEvent = (e) => {
  return e.key === 'Enter';
};

export {
  isEscEvent,
  isEnterEvent
};
