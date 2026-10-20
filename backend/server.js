require('dotenv').config();
const express = require('express');
const cors = require('cors');

const pwnedPasswordRoute = require('./routes/pwnedPassword');
const safeBrowsingRoute = require('./routes/safeBrowsing');
const firewallRoute = require('./routes/firewall');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hackathon starter backend is running 🚀' });
});

// POST /api/check-password  { "password": "..." }
app.use('/api/check-password', pwnedPasswordRoute);

// POST /api/check-url  { "url": "..." }
app.use('/api/check-url', safeBrowsingRoute);

// GET /api/firewall/rules, GET /api/firewall/sample-traffic, POST /api/firewall/evaluate
app.use('/api/firewall', firewallRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
