const { over, lensProp, concat } = require("ramda");

module.exports = (state, action) => {
  if (action.type !== "sticky") return state;
  return over(lensProp("stickyNotes"), concat([action.payload]), state);
};
