const mainReducer = require("./mainReducer");
const { inc } = require("ramda");

test("identity works", () => {
  const reducer = mainReducer([i => i]);
  const result = reducer(1, {});
  expect(result).toEqual(1);
});

test("works", () => {
  const reducer = mainReducer([inc]);
  const result = reducer(1, {});
  expect(result).toEqual(2);
});

test("pipes the values", () => {
  const reducer = mainReducer([inc, inc]);
  const result = reducer(1, {});
  expect(result).toEqual(3);
});

test("works conditionally", () => {
  const incrementIfTypeIsKaki = (a, { type }) => (type === "kaki" ? a + 1 : a);
  const reducer = mainReducer([incrementIfTypeIsKaki]);
  const shouldNotBeIncremented = reducer(1, {});
  const shouldBeIncremented = reducer(1, { type: "kaki" });

  expect(shouldNotBeIncremented).toEqual(1);
  expect(shouldBeIncremented).toEqual(2);
});
