const { Telegraf, Markup } = require("telegraf");
const { TOKEN } = require("./config");
const bot = new Telegraf(TOKEN);

// Error Handling
bot.catch((err, ctx) => {
    console.log(err);
    return ctx.reply("Something wrong !");
});

// Public
bot.start((ctx) => {
    ctx.reply("BOT is working...");
});

module.exports = bot;
