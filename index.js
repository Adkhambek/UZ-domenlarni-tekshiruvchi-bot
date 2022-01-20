const { Telegraf, Markup } = require("telegraf");
const { TOKEN } = require("./config");
const bot = new Telegraf(TOKEN);
const domainInfo = require("./domainInfo");
const textReply = require("./texts");

// Error Handling
bot.catch((err, ctx) => {
    console.log(err);
    return ctx.reply(text.error);
});

// Public
bot.start((ctx) => {
    const firstName = ctx.message.chat.first_name;
    ctx.reply(textReply.start(firstName), {
        parse_mode: "HTML",
        disable_web_page_preview: true,
    });
});

bot.on("text", async (ctx) => {
    try {
        const text = ctx.message.text;
        if (
            !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(
                text
            )
        ) {
            return ctx.reply(textReply.validError, { parse_mode: "HTML" });
        }

        if (text.endsWith(".uz")) {
            const domain = await domainInfo(text);
            if (domain.register) {
                ctx.reply(
                    textReply.registredDomain(
                        domain.name,
                        domain.status,
                        domain.dateCreated,
                        domain.activeUntil
                    ),
                    {
                        parse_mode: "HTML",
                        ...Markup.inlineKeyboard([
                            Markup.button.url(
                                "Домен эгаси билан боғланиш",
                                domain.contact
                            ),
                        ]),
                    }
                );
            } else {
                const btns = [];
                for (const provider of domain.providers) {
                    btns.push([
                        Markup.button.url(
                            `${provider.name}  ${provider.price}`,
                            provider.url
                        ),
                    ]);
                }
                ctx.reply(`${domain.message}`, Markup.inlineKeyboard(btns));
            }
        } else {
            ctx.reply(textReply.dotuzError);
        }
    } catch (error) {
        ctx.reply(text.error);
    }
});

module.exports = bot;
