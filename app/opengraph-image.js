import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top brand header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#FACC15",
              color: "#000000",
              fontWeight: 900,
              fontSize: "64px",
              padding: "10px 28px",
              border: "4px solid #000000",
              boxShadow: "6px 6px 0px #EF4444",
            }}
          >
            TRIMIFY
          </div>
          <div
            style={{
              background: "#EF4444",
              color: "#FFFFFF",
              fontSize: "24px",
              fontWeight: 900,
              padding: "8px 18px",
              border: "3px solid #000000",
              transform: "rotate(3deg)",
            }}
          >
            FREE URL SHORTENER
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 900,
            color: "#FFFDF0",
            lineHeight: 1.2,
            maxWidth: "1000px",
            marginBottom: "24px",
          }}
        >
          Shorten Smart. Brand Better. Track Every Single Click.
        </div>

        {/* Feature Pills */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "20px",
            fontWeight: 800,
          }}
        >
          <div
            style={{
              background: "#FACC15",
              color: "#000000",
              padding: "10px 20px",
              border: "3px solid #000000",
            }}
          >
            ⚡ Custom Aliases
          </div>
          <div
            style={{
              background: "#FFFDF0",
              color: "#000000",
              padding: "10px 20px",
              border: "3px solid #000000",
            }}
          >
            📊 Real-Time Analytics
          </div>
          <div
            style={{
              background: "#22C55E",
              color: "#000000",
              padding: "10px 20px",
              border: "3px solid #000000",
            }}
          >
            📱 Dynamic QR Codes
          </div>
        </div>

        {/* Canonical footer URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "24px",
            fontWeight: 900,
            color: "#FACC15",
          }}
        >
          https://www.trimy.me
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
