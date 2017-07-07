const r = require("rethinkdbdash")();

module.exports = () => r.db("r8mie").table("events").changes().run();
