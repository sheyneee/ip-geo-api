// controllers/ipinfo.controller.js
import { IPinfoWrapper } from "node-ipinfo";

const isValidIPv4 = (ip) =>
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/.test(ip);

export const getIpInfo = async (req, res) => {
  try {
    const token = process.env.IPINFO_TOKEN;
    if (!token) {
      return res.status(500).json({
        message: "Server misconfigured. Missing IPINFO_TOKEN.",
      });
    }

    const ip = String(req.query.ip || "").trim();

    // 1) If user searched an IP. Use node-ipinfo
    if (ip) {
      if (!isValidIPv4(ip)) {
        return res.status(400).json({ message: "Invalid IP address." });
      }

      const ipinfo = new IPinfoWrapper(token);
      const data = await ipinfo.lookupIp(ip);
      return res.json(data);
    }

    // 2) If no IP provided. Return info for requester IP (the one accessing the API)
    // Using the official endpoint avoids issues with proxies, IPv6, localhost, etc.
    const r = await fetch(`https://ipinfo.io/json?token=${token}`);
    if (!r.ok) {
      return res.status(r.status).json({ message: "Failed to fetch from IPinfo." });
    }
    const data = await r.json();
    return res.json(data);
  } catch (err) {
    console.error("IPinfo error:", err);
    return res.status(500).json({ message: "Failed to fetch IP information." });
  }
};
