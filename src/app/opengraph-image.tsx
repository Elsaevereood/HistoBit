import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Histobit — Military History for Serious People";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1008",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ color: "#c2652a", fontSize: 16, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 32, fontFamily: "serif" }}>
          HISTOBIT
        </div>
        <div style={{ color: "#faf5ee", fontSize: 64, fontStyle: "italic", textAlign: "center", lineHeight: 1.1, fontFamily: "serif", marginBottom: 24 }}>
          Military History for Serious People
        </div>
        <div style={{ color: "rgba(250,245,238,0.5)", fontSize: 22, textAlign: "center", fontFamily: "sans-serif" }}>
          Deep research. No mythology. Every week.
        </div>
      </div>
    ),
    { ...size }
  );
}
