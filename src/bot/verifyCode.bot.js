require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const User = require("../models/user.model");

function startTelegramBot() {
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
    polling: true,
  });

  console.log("🤖 Telegram bot ishga tushdi");

  function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      "📞 Telefon raqamingizni yuboring\nMasalan: +998901234567"
    );
  });

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const phone = msg.text?.replace(/\s/g, "");

    if (!phone || !phone.startsWith("+")) return;

    try {
      const user = await User.findOne({ phone });

      if (!user) {
        return bot.sendMessage(chatId, "❌ Bu raqam ro‘yxatdan o‘tmagan");
      }

      const code = generateCode();
      user.code = code;
      await user.save();

      bot.sendMessage(
        chatId,
        `🔐 Tasdiqlash kodi:\n\n*${code}*`,
        { parse_mode: "Markdown" }
      );
    } catch (err) {
      console.error("BOT ERROR:", err);
      bot.sendMessage(chatId, "⚠️ Xatolik yuz berdi");
    }
  });
}

module.exports = startTelegramBot;
