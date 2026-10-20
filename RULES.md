# WSH-CTF Hackathon Rules

Event site: [wsh-ctf.net](https://wsh-ctf.net)

These rules apply to every team and participant in the WSH-CTF hackathon. By taking part, you agree to follow them. Read them before you build anything.

## Theme

Cybersecurity. Build tools, apps, or demos related to security, privacy, or safety online. Projects must be defensive and educational, not offensive.

## Allowed

- Building your own vulnerable practice app, then a tool to scan or test that same app
- Using OWASP Juice Shop, or another intentionally vulnerable app provided by the organizers, as a scan target
- Password strength and breach-checking tools that use public APIs (for example, Pwned Passwords)
- Phishing and malware URL detectors that use public threat-intel APIs (Google Safe Browsing, VirusTotal)
- Encryption, authentication, and privacy tools
- Security awareness games, quizzes, and training platforms
- Visualizations of provided or synthetic security datasets, such as sample pcap files and sample logs
- Static code analysis and secret-scanning tools run on your own codebase
- Firewall rule engines, intrusion detection or prevention demos, and network traffic visualizers, as long as they run against the provided sample traffic data, synthetic data you generate, or a private virtual network you set up yourselves (a local Docker or VM lab, for example). Never run them on the venue Wi-Fi or any real school network.

## Not allowed

- Scanning, probing, or attacking any external system you don't own or have explicit written permission to test. This includes the school's network, other teams' projects, WSH-CTF competition infrastructure, and any third-party website.
- Sniffing or intercepting traffic on the shared venue Wi-Fi
- Building or demonstrating malware, ransomware, keyloggers, or any tool designed to gain unauthorized access
- Social engineering real people (staff, other participants, judges) in a demo without their prior consent
- Scraping or trying to access real user data without consent
- Any activity that breaks your country's computer misuse laws or your school's IT acceptable use policy

## Keep secrets out of your repo

Never commit API keys, tokens, or passwords. Keep them in a `.env` file, which the starter kit already excludes through `.gitignore`. If you commit a key by accident, revoke it right away and tell an organizer.

## Judging

Judges score each project on five criteria:

1. **Technical execution:** does it work, and is the code reasonably clean?
2. **Relevance to theme:** is there a clear security or privacy angle?
3. **Creativity:** is it an original take on a problem?
4. **Presentation:** is the live demo clear and well explained in the time allowed?
5. **Responsible design:** did the team think about the ethics and safety of what they built?

## Unsure whether something is in scope?

Ask an organizer or mentor before you build it. When in doubt, keep everything self-contained: your own app, your own data, your own devices.

## Consequences

A team that breaks the "Not allowed" rules, especially by attacking real infrastructure, will be disqualified immediately. Organizers may report serious violations, such as unauthorized access attempts, to school administration.

## Contact

Questions about the rules: ask an organizer or mentor at the event, or see [wsh-ctf.net](https://wsh-ctf.net) for current contact details.
