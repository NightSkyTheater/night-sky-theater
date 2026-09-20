const CHANNEL_ID = "UCagbKVKMsqoHsD1_LLk2W2w";
const BASELINE_SUBSCRIBERS = 2574;
const BASELINE_DATE = "2026-09-20";
const ANALYTICS_START_DATE = "2026-09-21";

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

async function getAccessToken() {
  const clientId = process.env.GOOGLE_CLIENT_ID || "";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
  const refreshToken = process.env.YOUTUBE_ANALYTICS_REFRESH_TOKEN || "";

  if (!clientId || !clientSecret || !refreshToken) return null;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google OAuth token refresh failed: ${errorText}`);
  }

  const data = await response.json();
  return data.access_token || null;
}

async function getAnalyticsSubscriberDelta(accessToken) {
  const today = formatDate(new Date());

  if (today < ANALYTICS_START_DATE) {
    return {
      gained: 0,
      lost: 0,
      net: 0,
      latestDate: BASELINE_DATE,
      rows: 0,
    };
  }

  const params = new URLSearchParams({
    ids: "channel==MINE",
    startDate: ANALYTICS_START_DATE,
    endDate: today,
    metrics: "subscribersGained,subscribersLost",
    dimensions: "day",
    sort: "day",
  });

  const response = await fetch(
    `https://youtubeanalytics.googleapis.com/v2/reports?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`YouTube Analytics API failed: ${errorText}`);
  }

  const data = await response.json();
  const rows = Array.isArray(data.rows) ? data.rows : [];

  let gained = 0;
  let lost = 0;
  let latestDate = BASELINE_DATE;

  for (const row of rows) {
    latestDate = row[0] || latestDate;
    gained += Number(row[1] || 0);
    lost += Number(row[2] || 0);
  }

  return {
    gained,
    lost,
    net: gained - lost,
    latestDate,
    rows: rows.length,
  };
}

async function getPublicStats(apiKey) {
  if (!apiKey) return null;

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

  return {
    subscribers: Number(stats.subscriberCount || 0),
    views: Number(stats.viewCount || 0),
    videos: Number(stats.videoCount || 0),
  };
}

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

    const publicStats = await getPublicStats(apiKey);

    let subscribers = BASELINE_SUBSCRIBERS;
    let subscriberSource = "baseline";
    let analytics = null;

    try {
      const accessToken = await getAccessToken();

      if (accessToken) {
        analytics = await getAnalyticsSubscriberDelta(accessToken);
        subscribers = BASELINE_SUBSCRIBERS + analytics.net;
        subscriberSource = "analytics";
      }
    } catch (analyticsError) {
      console.error("YOUTUBE ANALYTICS ERROR:", analyticsError);
      subscriberSource = "baseline-fallback";
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

    return res.status(200).json({
      success: true,
      channelId: CHANNEL_ID,
      subscribers,
      views: publicStats?.views ?? 0,
      videos: publicStats?.videos ?? 0,
      subscriberSource,
      baseline: {
        date: BASELINE_DATE,
        subscribers: BASELINE_SUBSCRIBERS,
      },
      analytics,
      publicSubscriberCount: publicStats?.subscribers ?? null,
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
