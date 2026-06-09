import { ImageResponse } from "next/og";

export const alt = "Gjorgi Krmzov, AI & Automation Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f6f7",
          color: "#0e0e0f",
          padding: 90,
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: "#56565a" }}>
          Gjorgi Krmzov, AI & Automation Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          I build automated systems that remove the manual work.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#ff5a1e" }}>
          www.krmzov.com
        </div>
      </div>
    ),
    size,
  );
}
