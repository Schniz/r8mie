const r = require("rethinkdbdash")();
const reducers = require("../reducers");

const INITIAL_STATE = {
  stickyNotes: []
};

const onNew = async ({ newVal }) => {
  const state = await r
    .db("r8mie")
    .table("state")
    .get(newVal.chatId)
    .default(INITIAL_STATE)
    .run();
  const newState = reducers(state, newVal);
  return await r.db("r8mie").table("state").insert(Object.assign(newState, {
    id: newVal.chatId
  }), {
    conflict: "replace"
  });
};

const onUpdated = ({ newVal, oldVal }) => {};
const onDeleted = ({ oldVal }) => {};

module.exports = { onNew, onUpdated, onDeleted };
