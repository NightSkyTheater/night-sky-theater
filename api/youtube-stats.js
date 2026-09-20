const CHANNEL_ID = "UCagbKVKMsqoHsD1_LLk2W2w";

export default async function handler(req, res) {
  const allowedOrigins = new Set([
    "https://nightskytheater.kr",
    "https://www.nightskytheater.kr",
    "https://night-sky-theater-hq.vercel.app",
  ]);

  const origin = req.headers.origin;
  if (origin && (allowedOrigins.has(origin) || origin.endsWith(".vercel.app"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const apiKey =
      process.env.YOUTUBE_API_KEY ||
      process.env.VITE_YOUTUBE_API_KEY ||
      "";

    if (!apiKey) {
      return res.status(503).json({
        success: false,
        error: "YouTube API key is not configured.",
      });
    }

    const url =
      "https://www.googleapis.com/youtube/v3/channels" +
      `?part=statistics&id=${encodeURIComponent(CHANNEL_ID)}&key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data.items?.[0]?.statistics) {
      throw new Error(
        data?.error?.message ||
        "Failed to load YouTube channel statistics."
      );
    }

    const stats = data.items[0].statistics;

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

    return res.status(200).json({
      success: true,
      channelId: CHANNEL_ID,
      subscribers: Number(stats.subscriberCount || 0),
      views: Number(stats.viewCount || 0),
      videos: Number(stats.videoCount || 0),
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("YOUTUBE STATS API ERROR:", error);
    return res.status(502).json({
      success: false,
      error: error.message || "YouTube statistics lookup failed.",
    });
  }
}
