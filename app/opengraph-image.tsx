import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 1200x630 link-preview card (LinkedIn, X, Slack, iMessage), generated at
// build time. The previous og:image was the raw 1024x1536 hero portrait,
// which large-image cards center-crop to a torso strip. Composition follows
// DESIGN.md: canvas #f6f6f7, one light Bricolage line, B&W portrait
// dissolving off the right edge, accent only as a tiny mark.

export const alt =
  "Gjorgi Krmzov. I build the systems that remove manual work inside SEO agencies.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [font, portrait] = await Promise.all([
    readFile(join(process.cwd(), "assets/BricolageGrotesque-Regular.ttf")),
    readFile(join(process.cwd(), "public/gjorgi.png")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#f6f6f7",
          fontFamily: "Bricolage Grotesque",
        }}
      >
        {/* portrait, anchored bottom-right */}
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src={`data:image/png;base64,${portrait.toString("base64")}`}
          width={460}
          height={690}
          style={{ position: "absolute", right: -30, bottom: -80 }}
        />
        {/* dissolve the portrait's left edge into the canvas */}
        <div
          style={{
            position: "absolute",
            right: 230,
            top: 0,
            width: 260,
            height: 630,
            background:
              "linear-gradient(90deg, #f6f6f7 0%, rgba(246, 246, 247, 0) 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 0 72px 72px",
            width: 860,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 30,
              color: "#0e0e0f",
              letterSpacing: "-0.01em",
            }}
          >
            Gjorgi Krmzov
            {/* the tiny accent mark */}
            <div
              style={{
                width: 10,
                height: 10,
                marginLeft: 14,
                marginTop: 12,
                borderRadius: 999,
                background: "#ff5a1e",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 58,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: "#0e0e0f",
            }}
          >
            <span>I build the systems</span>
            <span>that remove manual work</span>
            <span>inside SEO agencies.</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: font,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
