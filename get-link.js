export default function handler(req, res) {
  const link =
    process.env.TELEGRAM_INVITE_LINK ||
    "https://t.me/+whEw6n0dq6llYmNl";

  res.status(200).json({ url: link });
}
