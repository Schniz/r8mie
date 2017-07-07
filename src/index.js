const { RERUN_ALL, TELEGRAM_BOT_TOKEN } = require("./env");
const TelegramBot = require("node-telegram-bot-api");
require("./stateManager")(RERUN_ALL === "true");

const EMOJI_THUMBSUP = "👍";
const r = require("rethinkdbdash")();
const addEvent = ({ type, payload, chatId, userId }) => {
  return r
    .db("r8mie")
    .table("events")
    .insert({
      userId,
      chatId,
      timestamp: r.now(),
      payload,
      type
    })
    .run();
};

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  bot.sendMessage(msg.chat.id, `WTF ${match[1]}`);
});

bot.onText(/^\/spent (\d+)$/, (msg, match) => {
  const amountSpent = match[1];
  addEvent({
    chatId: msg.chat.id,
    userId: msg.from.id,
    type: "spent",
    payload: amountSpent
  }).then(() => {
    bot.sendMessage(msg.chat.id, EMOJI_THUMBSUP, {
      reply_to_message_id: msg.message_id
    });
  });
});

bot.onText(/^\/payback (\d+)/, (msg, match) => {
  const amountSpent = match[1];
  addEvent({
    chatId: msg.chat.id,
    userId: msg.from.id,
    type: "payback",
    payload: amountSpent
  }).then(() => {
    bot.sendMessage(msg.chat.id, EMOJI_THUMBSUP, {
      reply_to_message_id: msg.message_id
    });
  });
});

bot.onText(/^\/stickynote (.+)$/, (msg, match) => {
  const stickyNote = match[1];
  addEvent({
    chatId: msg.chat.id,
    userId: msg.from.id,
    type: "sticky",
    payload: stickyNote
  }).then(() => {
    bot.sendMessage(msg.chat.id, EMOJI_THUMBSUP, {
      reply_to_message_id: msg.message_id
    });
  });
});
