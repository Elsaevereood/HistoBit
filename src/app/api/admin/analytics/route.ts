import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get("Authorization");
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  return authHeader === secret;
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const rawPropertyId = process.env.GA4_PROPERTY_ID;

  if (!serviceAccountJson || !rawPropertyId) {
    return NextResponse.json(
      { error: "GA4 credentials not configured" },
      { status: 500 }
    );
  }

  const propertyId = rawPropertyId.startsWith("properties/")
    ? rawPropertyId
    : `properties/${rawPropertyId}`;

  let credentials: Record<string, string>;
  try {
    credentials = JSON.parse(serviceAccountJson);
  } catch {
    return NextResponse.json(
      { error: "Invalid GOOGLE_SERVICE_ACCOUNT_JSON" },
      { status: 500 }
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });

  const analyticsData = google.analyticsdata({ version: "v1beta", auth });

  const dateRange = { startDate: "30daysAgo", endDate: "today" };

  try {
    const [overviewRes, blogPostsRes, sourcesRes, countriesRes] =
      await Promise.all([
        // 1. Total sessions and users site-wide
        analyticsData.properties.runReport({
          property: propertyId,
          requestBody: {
            dateRanges: [dateRange],
            metrics: [{ name: "sessions" }, { name: "totalUsers" }],
          },
        }),

        // 2. Page views per blog post path
        analyticsData.properties.runReport({
          property: propertyId,
          requestBody: {
            dateRanges: [dateRange],
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "screenPageViews" }],
            dimensionFilter: {
              filter: {
                fieldName: "pagePath",
                stringFilter: {
                  matchType: "BEGINS_WITH",
                  value: "/blog/",
                },
              },
            },
            orderBys: [
              {
                metric: { metricName: "screenPageViews" },
                desc: true,
              },
            ],
            limit: "50",
          },
        }),

        // 3. Top 5 traffic sources
        analyticsData.properties.runReport({
          property: propertyId,
          requestBody: {
            dateRanges: [dateRange],
            dimensions: [{ name: "sessionSource" }],
            metrics: [{ name: "sessions" }],
            orderBys: [
              {
                metric: { metricName: "sessions" },
                desc: true,
              },
            ],
            limit: "5",
          },
        }),

        // 4. Top 5 audience countries
        analyticsData.properties.runReport({
          property: propertyId,
          requestBody: {
            dateRanges: [dateRange],
            dimensions: [{ name: "country" }],
            metrics: [{ name: "totalUsers" }],
            orderBys: [
              {
                metric: { metricName: "totalUsers" },
                desc: true,
              },
            ],
            limit: "5",
          },
        }),
      ]);

    const overviewRow = overviewRes.data.rows?.[0];
    const totalSessions = parseInt(overviewRow?.metricValues?.[0]?.value ?? "0");
    const totalUsers = parseInt(overviewRow?.metricValues?.[1]?.value ?? "0");

    const blogPosts = (blogPostsRes.data.rows ?? []).map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? "",
      views: parseInt(row.metricValues?.[0]?.value ?? "0"),
    }));

    const sources = (sourcesRes.data.rows ?? []).map((row) => ({
      source: row.dimensionValues?.[0]?.value ?? "(direct)",
      sessions: parseInt(row.metricValues?.[0]?.value ?? "0"),
    }));

    const countries = (countriesRes.data.rows ?? []).map((row) => ({
      country: row.dimensionValues?.[0]?.value ?? "Unknown",
      users: parseInt(row.metricValues?.[0]?.value ?? "0"),
    }));

    return NextResponse.json({
      totalSessions,
      totalUsers,
      blogPosts,
      sources,
      countries,
    });
  } catch (err) {
    console.error("GA4 API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch GA4 data" },
      { status: 500 }
    );
  }
}
