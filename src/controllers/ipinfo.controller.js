import fetch from "node-fetch";

const isValidIp = (ip) => {
  const ipv4 =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  return ipv4.test(ip);
};

export const getIpInfo = async (req, res) => {
  try {
    const { ip } = req.query;

    if (!process.env.IPINFO_TOKEN) {
      return res
        .status(500)
        .json({ message: "Server misconfigured. Missing IPINFO_TOKEN." });
    }

    if (ip && !isValidIp(ip)) {
      return res.status(400).json({ message: "Invalid IP address." });
    }

    const url = ip
      ? `https://ipinfo.io/${ip}/geo?token=${process.env.IPINFO_TOKEN}`
      : `https://ipinfo.io/geo?token=${process.env.IPINFO_TOKEN}`;

    const response = await fetch(url);
    const data = await response.json();

    return res.json(data);
  } catch (err) {
    console.error("IPinfo error:", err);
    return res.status(500).json({ message: "Failed to fetch IP information." });
  }
};
