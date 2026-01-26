// controllers/ipinfo.controller.js
import { IPinfoWrapper } from "node-ipinfo";

const isValidIp = (ip) =>
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/.test(ip);

export const getIpInfo = async (req, res) => {
  try {
    const token = process.env.IPINFO_TOKEN;
    if (!token) {
      return res.status(500).json({ message: "Server misconfigured. Missing IPINFO_TOKEN." });
    }

    const ip = String(req.query.ip || "").trim();

    if (ip && !isValidIp(ip)) {
      return res.status(400).json({ message: "Invalid IP address." });
    }

    const ipinfo = new IPinfoWrapper(token);

    // ✅ IMPORTANT:
    // - If ip is provided: lookup that ip
    // - If ip is empty: lookup requester (do not pass "me")
    const data = ip ? await ipinfo.lookupIp(ip) : await ipinfo.lookupIp();

    return res.json(data);
  } catch (err) {
    console.error("IPinfo error:", err);
    return res.status(500).json({ message: "Failed to fetch IP information." });
  }
};
