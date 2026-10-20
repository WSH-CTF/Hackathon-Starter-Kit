const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

// Uses the Google Safe Browsing API to check if a URL is flagged as
// malware, social engineering (phishing), or unwanted software.
// Docs: https://developers.google.com/safe-browsing/v4/lookup-api
// Get a free API key: https://developers.google.com/safe-browsing/v4/get-started

router.post('/', async (req, res) => {
  const { url } = req.body;
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Provide a "url" string in the request body.' });
  }

  if (!apiKey) {
    return res.status(500).json({
      error: 'GOOGLE_SAFE_BROWSING_API_KEY is not set. Add it to your .env file.',
    });
  }

  try {
    const body = {
      client: { clientId: 'hackathon-starter-kit', clientVersion: '1.0.0' },
      threatInfo: {
        threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [{ url }],
      },
    };

    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    const isFlagged = Boolean(data.matches && data.matches.length > 0);

    res.json({
      url,
      flagged: isFlagged,
      matches: data.matches || [],
      message: isFlagged
        ? 'This URL is flagged as potentially unsafe.'
        : 'No known threats found for this URL.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong checking the URL.' });
  }
});

module.exports = router;
