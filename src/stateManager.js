const r = require("rethinkdbdash")();
const reducers = require("./reducers");
const { onNew, onDeleted, onUpdated } = require("./state/events");
const getChangeset = require("./state/getChangeset");

module.exports = async () => {
  const cursor = await getChangeset();
  cursor.each((err, { new_val: newVal, old_val: oldVal }) => {
    if (!oldVal && newVal) {
      onNew({ oldVal, newVal });
    } else if (!newVal && oldVal) {
      onDeleted({ newVal, oldVal });
    } else if (newVal && oldVal) {
      onUpdated({ newVal, oldVal });
    }
  });
};
