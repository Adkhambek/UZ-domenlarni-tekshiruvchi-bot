# Domen tekshiruvchi bot

Uz Domen ro'yxatdan o'tgan yoki o'tmaganligini bilish ushun yasalgan Telegram Bot. Ma'lumotlar [cctld.uz](https://cctld.uz/whois) saytidan olingan.

## Telegram bot

[@uzdomaincheck_bot](https://t.me/uzdomaincheck_bot)

## O'rnatish

```
$ git clone https://github.com/Adkhambek/UZ-domenlarni-tekshiruvchi-bot.git
$ cd uzdomaincheck_bot
$ npm install
```

## Ishga tushirish

1. [@BotFather](https://t.me/BotFather) orqali bo't yasab undan TOKEN oling;
2. .env faylini yasab quyidagilarni kiriting: - TOKEN - PORT - BASE_URL - SECRET_PATH
   (.env.example faylidan foydalansangiz bo'ladi)
3. npm run dev

## Ishlatilgan texnalogiyalar

-   Nodejs
-   Telegraf
-   Jsdom
-   Express
-   Qo'shimcha: axios, dotenv and cross-env
