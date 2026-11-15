import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 110,
          background: "#FACC15",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000000",
          fontWeight: 900,
          fontFamily: "sans-serif",
          borderRadius: "36px",
          border: "8px solid #000000",
        }}
      >
        T
      </div>
    ),
    {
      ...size,
    }
  );
}
