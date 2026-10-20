# 🛡️ WSH'26 — Starter Kit

Welcome! This repo is your launchpad. Fork/clone it, fill in your `.env`, and start building.
You do **not** have to use this stack — it's here so beginner teams have something working
in the first 30 minutes instead of fighting with setup.

---

## 📁 What's in this kit

```
hackathon-starter-kit/
├── README.md              <- you are here
├── RULES.md                <- read this before you build anything
├── .env.example             <- copy to .env and fill in your own keys
├── backend/
│   ├── package.json
│   ├── server.js            <- Express server with example routes
│   ├── data/
│   │   └── sampleTraffic.json <- synthetic network traffic log (includes a fake port scan)
│   └── routes/
│       ├── pwnedPassword.js <- checks a password against known breaches (k-anonymity, safe)
│       ├── safeBrowsing.js  <- checks a URL against Google Safe Browsing
│       └── firewall.js      <- rule-based firewall simulator + simple port-scan detector
└── frontend/
    └── index.html           <- plain HTML/JS starter, no build step needed
```

---

## 🚀 Quick start

### Backend
```bash
cd backend
npm install
cp ../.env.example .env   # fill in your API keys
npm start                  # runs on http://localhost:3001
```

### Frontend
Just open `frontend/index.html` in your browser, or serve it:
```bash
cd frontend
npx serve .
```

No backend/frontend split needed either — plenty of great projects are single-page apps
or pure Python/CLI tools. Use whatever gets you to a demo fastest.

---

## 🧰 Recommended free tools & APIs

### Hosting / Backend-as-a-Service
| Tool | Free tier | Good for |
|---|---|---|
| [Firebase](https://firebase.google.com/) | Spark plan (generous) | Auth, Firestore DB, hosting |
| [Supabase](https://supabase.com/) | Free tier | Postgres DB, auth, storage |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | 512MB free cluster | NoSQL database |
| [Render](https://render.com/) / [Railway](https://railway.app/) | Free/low-cost | Backend hosting |
| [Vercel](https://vercel.com/) / [Netlify](https://netlify.com/) | Free tier | Frontend hosting |
| [GitHub Student Developer Pack](https://education.github.com/pack) | Free | Bundles most of the above + more |

### Security-relevant APIs (all have free tiers)
| API | What it does | Docs |
|---|---|---|
| **Have I Been Pwned — Pwned Passwords** | Check if a password has appeared in a breach, using k-anonymity (no API key needed) | https://haveibeenpwned.com/API/v3#PwnedPasswords |
| **Have I Been Pwned — Breach lookup** | Check if an email appears in known breaches (needs a paid key for the email-lookup endpoint, but Pwned Passwords above is free) | https://haveibeenpwned.com/API/v3 |
| **Google Safe Browsing API** | Check if a URL is flagged as malware/phishing | https://developers.google.com/safe-browsing |
| **VirusTotal API** | Free-tier file/URL scanning | https://developers.virustotal.com/reference |
| **Auth0** / **Clerk** | Free-tier auth-as-a-service, good for MFA/passwordless demos | https://auth0.com/ · https://clerk.com/ |
| **OpenAI API** / **Anthropic API** | Small free/trial credits — good for phishing-email classifiers, chatbots | https://platform.openai.com/ · https://console.anthropic.com/ |
| **OWASP Juice Shop** | Deliberately vulnerable app — great as a *target* for a scanner you build, but only scan this or apps you build yourselves | https://owasp.org/www-project-juice-shop/ |

### Dev tools
- [Postman](https://www.postman.com/) / [Insomnia](https://insomnia.rest/) — test your APIs
- [Figma](https://figma.com/) — free UI/UX design
- [GitHub Codespaces](https://github.com/features/codespaces) — free-tier cloud dev environment, zero local setup

---

## 🔥 Firewall / network security endpoints (new!)

No real network access or hardware needed — these work entirely on JSON "packet" data,
either the bundled sample log or data your team generates:

| Endpoint | Method | What it does |
|---|---|---|
| `/api/firewall/rules` | GET | Returns the active firewall rule set |
| `/api/firewall/sample-traffic` | GET | Returns the bundled synthetic traffic log |
| `/api/firewall/evaluate` | POST | Runs packets through the firewall rules, flags port-scan-like behavior. Body: `{ "packets": [...] }` (omit to use the sample log) |

The sample log includes a fake port-scan pattern (one source IP hitting several ports
in a row) so your scan-detection demo has something to actually catch out of the box.
Extend `defaultRules` in `firewall.js` with your own allow/deny logic, or swap in your
own generated traffic data.

## 💡 Example project ideas using this kit

**Web/app security**
- **Password strength checker** — plug the Pwned Passwords route into a signup form
- **Phishing URL scanner** — combine Safe Browsing + VirusTotal, show a risk score
- **Security awareness quiz** — "spot the phishing email" game, no backend needed
- **Breach dashboard** — visualize known breach data for a fictional company
- **Secure vault** — client-side encrypt/decrypt notes before storing in Firebase/Supabase

**Network security / firewalls (new!)**
- **Custom firewall builder** — a UI where users define allow/deny rules (by IP, port, protocol) and test them against sample traffic
- **Intrusion Detection System (IDS) dashboard** — extend the port-scan detector to catch other patterns (brute-force login attempts, DDoS-like traffic spikes) in sample logs
- **Firewall rule visualizer** — animate packets flowing through rules, showing which get blocked and why
- **Network traffic anomaly detector** — simple statistics or ML model flags traffic that deviates from a "normal" baseline in provided sample data
- **VPN/traffic encryption demo** — simulate how traffic looks encrypted vs. plaintext to an eavesdropper
- **Zero-trust access simulator** — a mock internal network where every request must be explicitly authorized, visualized as a graph

See `RULES.md` for what's in and out of scope before you start — all of the above should
run against **sample/synthetic data or apps you build yourselves**, never real school or
third-party networks.

Good luck — build something you're proud to pitch! 🚀
