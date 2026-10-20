const express = require('express');
const router = express.Router();
const sampleTraffic = require('../data/sampleTraffic.json');

// ---------------------------------------------------------------------------
// A tiny software firewall simulator.
// No real network access needed — it evaluates JSON "packets" (real ones you
// capture into a similar shape, or the bundled sample data) against a list
// of allow/deny rules, and flags simple attack patterns like port scans.
// Great base for a "build your own firewall/IDS dashboard" project.
// ---------------------------------------------------------------------------

// Default rule set — teams can extend/replace this.
// Rules are checked in order; first match wins. Default action if no rule matches: ALLOW.
const defaultRules = [
  { action: 'DENY', protocol: 'TCP', destPort: 23, reason: 'Telnet is insecure — blocked' },
  { action: 'DENY', protocol: 'TCP', destPort: 21, reason: 'Unencrypted FTP — blocked' },
  { action: 'DENY', protocol: 'TCP', destPort: 445, reason: 'SMB exposed externally — blocked' },
  { action: 'DENY', protocol: 'TCP', destPort: 3389, srcNotIn: ['192.168.1.0/24'], reason: 'RDP only allowed from internal LAN' },
  { action: 'ALLOW', protocol: 'TCP', destPort: 443, reason: 'HTTPS allowed' },
  { action: 'ALLOW', protocol: 'TCP', destPort: 80, reason: 'HTTP allowed' },
  { action: 'ALLOW', protocol: 'UDP', destPort: 53, reason: 'DNS allowed' },
];

function ipInCidr(ip, cidr) {
  // Very small helper for /24 checks only — good enough for a demo.
  if (!cidr.includes('/24')) return false;
  const base = cidr.split('/')[0].split('.').slice(0, 3).join('.');
  return ip.startsWith(base + '.');
}

function evaluatePacket(packet, rules) {
  for (const rule of rules) {
    if (rule.protocol && rule.protocol !== packet.protocol) continue;
    if (rule.destPort && rule.destPort !== packet.destPort) continue;
    if (rule.srcNotIn) {
      const inAllowedRange = rule.srcNotIn.some((cidr) => ipInCidr(packet.srcIp, cidr));
      if (inAllowedRange) continue; // rule doesn't apply, src IS in the allowed range
    }
    return { action: rule.action, reason: rule.reason };
  }
  return { action: 'ALLOW', reason: 'No matching rule — default allow' };
}

// Extremely simple port-scan detector: flags a source IP that hits
// 3+ distinct destination ports within a short time window.
function detectPortScans(packets) {
  const bySource = {};
  for (const p of packets) {
    if (!bySource[p.srcIp]) bySource[p.srcIp] = new Set();
    bySource[p.srcIp].add(p.destPort);
  }
  return Object.entries(bySource)
    .filter(([, ports]) => ports.size >= 3)
    .map(([srcIp, ports]) => ({
      srcIp,
      distinctPorts: ports.size,
      ports: Array.from(ports),
      verdict: 'Possible port scan',
    }));
}

// GET /api/firewall/rules — see the active rule set
router.get('/rules', (req, res) => {
  res.json({ rules: defaultRules });
});

// GET /api/firewall/sample-traffic — grab the bundled sample data to visualize
router.get('/sample-traffic', (req, res) => {
  res.json({ traffic: sampleTraffic });
});

// POST /api/firewall/evaluate  { "packets": [...] }  (optional — defaults to sample traffic)
router.post('/evaluate', (req, res) => {
  const packets = req.body.packets || sampleTraffic;
  const results = packets.map((p) => ({ ...p, ...evaluatePacket(p, defaultRules) }));
  const scans = detectPortScans(packets);
  res.json({
    evaluated: results,
    blockedCount: results.filter((r) => r.action === 'DENY').length,
    allowedCount: results.filter((r) => r.action === 'ALLOW').length,
    suspiciousActivity: scans,
  });
});

module.exports = router;
