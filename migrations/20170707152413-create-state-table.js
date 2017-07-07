exports.up = async function (r, connection) {
  await r.db('r8mie').tableCreate('state')
};

exports.down = async function (r, connection) {
  await r.db('r8mie').tableDrop('state')
};
