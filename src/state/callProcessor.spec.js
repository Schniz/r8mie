const mockEvents = {
  onNew: jest.fn(),
  onUpdated: jest.fn(),
  onDeleted: jest.fn()
};
jest.mock("./events", () => mockEvents);

const callProcessor = require("./callProcessor");

beforeAll(() => {
  Object.keys(mockEvents).forEach(k => mockEvents[k].mockClear());
});

test("it calls onNew when new_val && !old_val", async () => {
  callProcessor({ newVal: {}, oldVal: null });
  expect(mockEvents.onNew).toBeCalled();
});

test("it calls onDeleted when !new_val && old_val", async () => {
  callProcessor({ newVal: null, oldVal: {} });
  expect(mockEvents.onDeleted).toBeCalled();
});

test("it calls onUpdated when new_val && old_val", async () => {
  callProcessor({ newVal: {}, oldVal: {} });
  expect(mockEvents.onUpdated).toBeCalled();
});
