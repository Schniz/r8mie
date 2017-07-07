let mockResult = {};
const mockEvents = {
  onNew: jest.fn(),
  onUpdated: jest.fn(),
  onDeleted: jest.fn(),
}
jest.mock("./state/getChangeset", () => () => Promise.resolve(mockResult));
jest.mock("./state/events", () => mockEvents)
const stateManager = require("./stateManager");

beforeAll(() => {
  Object.keys(mockEvents).forEach(k => mockEvents[k].mockClear())
})

test("it calls onNew when new_val && !old_val", async () => {
  mockResult = {
    each: f => f(null, { new_val: {}, old_val: null })
  };
  await stateManager();
  expect(mockEvents.onNew).toBeCalled()
});

test("it calls onDeleted when !new_val && old_val", async () => {
  mockResult = {
    each: f => f(null, { new_val: null, old_val: {} })
  };
  await stateManager();
  expect(mockEvents.onDeleted).toBeCalled()
});

test("it calls onUpdated when new_val && old_val", async () => {
  mockResult = {
    each: f => f(null, { new_val: {}, old_val: {} })
  };
  await stateManager();
  expect(mockEvents.onUpdated).toBeCalled()
});
