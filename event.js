export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ok:false, error:"Method not allowed"});
  }
  try {
    const raw = await readBody(req);
    const data = Object.fromEntries(new URLSearchParams(raw));
    // Vercel functions do not provide persistent storage by themselves.
    // The event is accepted here so the frontend keeps the original API flow.
    // Connect this endpoint to your preferred database/analytics service if
    // you need persistent server-side event storage.
    console.log("landing_event", {
      type: data.type,
      vid: data.vid,
      eid: data.eid,
      campaign: data.campaign,
      ad: data.ad,
      fbclid: data.fbclid ? "[present]" : ""
    });
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ok:false});
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}
