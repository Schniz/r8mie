const { TELEGRAM_BOT_TOKEN } = require("./env");
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  bot.sendMessage(msg.chat.id, `WTF ${match[1]}`);
});

bot.onText(/^\/spent (\d+)$/, (msg, match) => {
  const amountSpent = match[1];
  bot.sendMessage(msg.chat.id, `SPENT ${amountSpent} you fuck`);
});

bot.onText(/^\/payback (\d+)/, (msg, match) => {
  const amountPayback = match[1];
  bot.sendMessage(msg.chat.id, `PAYED BACK ${amountPayback} you fuck`);
});

bot.onText(/^\/stickynote (.+)$/, (msg, match) => {
  const stickyNote = match[1];
  bot.sendMessage(msg.chat.id, `POSTING ${stickyNote} on the wall`);
});
