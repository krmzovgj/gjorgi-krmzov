import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 1200x630 link-preview card for /hours, generated at build time. Without
// this the page inherits the root card, which is the portrait and says
// nothing about the tool. This one is type only: the question the page
// answers, and the domain.

export const alt = "What should you automate first? krmzov.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const font = await readFile(
    join(process.cwd(), "assets/BricolageGrotesque-Regular.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 72px",
          background: "#f6f6f7",
          fontFamily: "Bricolage Grotesque",
          color: "#0e0e0f",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
          }}
        >
          <span>What should you</span>
          <span>automate first?</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            letterSpacing: "-0.01em",
            color: "#56565a",
          }}
        >
          krmzov.com
          {/* the tiny accent mark, as on the root card */}
          <div
            style={{
              width: 10,
              height: 10,
              marginLeft: 14,
              borderRadius: 999,
              background: "#ba2c13",
            }}
          />
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
