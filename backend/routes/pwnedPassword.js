const express = require('express');
const crypto = require('crypto');
const fetch = require('node-fetch');

const router = express.Router();

// Uses the "Pwned Passwords" k-anonymity API from Have I Been Pwned.
// We only ever send the FIRST 5 CHARACTERS of the SHA-1 hash of the password —
// the real password (and even the full hash) never leaves this server.
// Docs: https://haveibeenpwned.com/API/v3#PwnedPasswords

router.post('/', async (req, res) => {
  const { password } = req.body;

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Provide a "password" string in the request body.' });
  }

  try {
    const sha1 = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
    const prefix = sha1.slice(0, 5);
    const suffix = sha1.slice(5);

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await response.text();

    const lines = text.split('\n');
    let breachCount = 0;

    for (const line of lines) {
      const [hashSuffix, count] = line.trim().split(':');
      if (hashSuffix === suffix) {
        breachCount = parseInt(count, 10);
        break;
      }
    }

    res.json({
      pwned: breachCount > 0,
      timesSeen: breachCount,
      message:
        breachCount > 0
          ? `This password has appeared in ${breachCount.toLocaleString()} known breaches. Choose a different one.`
          : 'This password was not found in known breaches. (Still use a unique, strong password!)',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong checking the password.' });
  }
});

module.exports = router;
