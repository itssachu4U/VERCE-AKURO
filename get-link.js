export default function handler(req, res) {
  const link =
    process.env.TELEGRAM_INVITE_LINK ||
    "https://t.me/+LWr2hcTQomQ4NmY1";

  res.status(200).json({ url: link });
}
