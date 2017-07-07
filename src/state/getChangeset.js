const r = require("rethinkdbdash")();

module.exports = ({ rerunAll }) =>
  r
    .db("r8mie")
    .table("events")
    .changes({
      includeInitial: rerunAll
    })
    .run();
