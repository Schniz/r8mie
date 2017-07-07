const mainReducer = require('./mainReducer')

module.exports = mainReducer([
  require('./reducers/stickyNote'),
]);
