const { onNew, onDeleted, onUpdated } = require("./events");

const getProcessor = ({newVal, oldVal}) => {
  if (!oldVal && newVal) {
    return onNew;
  } else if (!newVal && oldVal) {
    return onDeleted;
  } else if (newVal && oldVal) {
    return onUpdated;
  }
}

module.exports = ({newVal, oldVal}) => {
  const x = getProcessor({newVal, oldVal})({newVal, oldVal})
  return x
}
