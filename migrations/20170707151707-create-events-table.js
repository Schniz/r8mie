exports.up = async function (r, connection) {
  await r.dbCreate('r8mie')
  await r.db('r8mie').tableCreate('events')
  await r.db('r8mie').table('events').indexCreate('timestamp')
  await r.db('r8mie').table('events').indexCreate('chatId')
};

exports.down = async function (r, connection) {
  await r.dbDrop('r8mie')
};
