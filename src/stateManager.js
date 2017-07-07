const reducers = require("./reducers");
const { onNew, onDeleted, onUpdated } = require("./state/events");
const callProcessor = require("./state/callProcessor");
const getChangeset = require("./state/getChangeset");

module.exports = async (rerunAll = false) => {
  const cursor = await getChangeset({ rerunAll });
  const process = async (err, { new_val: newVal, old_val: oldVal }) => {
    const processed = callProcessor({ newVal, oldVal });
    await Promise.resolve(processed);
    cursor.next(process);
  };
  cursor.next(process);
};
