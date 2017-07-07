const stickyNote = require("./stickyNote");
const INITIAL_STATE = { stickyNotes: [] };

test('it passes on anything that is not "sticky"', () => {
  const state = INITIAL_STATE;
  expect(stickyNote(state, {})).toEqual(state);
});

test("concats a stickynote", () => {
  const state = INITIAL_STATE;
  const action = { payload: "remind avihy to kaki", type: "sticky" };
  expect(stickyNote(state, action)).toEqual(
    expect.objectContaining({
      stickyNotes: [action.payload]
    })
  );
});
