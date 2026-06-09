import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Gjorgi Krmzov, AI & Automation Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public", "gjorgi.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#f6f6f7",
          color: "#0e0e0f",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 80,
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#56565a" }}>
            Gjorgi Krmzov
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 60,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              AI &amp; Automation Engineer
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: "#56565a",
                marginTop: 24,
                maxWidth: 540,
              }}
            >
              I build the systems that remove manual work inside agencies.
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#ff5a1e" }}>
            www.krmzov.com
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", height: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} width={420} height={630} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
