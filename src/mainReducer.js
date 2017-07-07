module.exports = reducers => (state, action) => {
  return reducers.reduce((newState, reducer) => reducer(newState, action), state)
}
