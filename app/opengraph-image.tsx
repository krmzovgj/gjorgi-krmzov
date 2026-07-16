import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 1200x630 link-preview card (LinkedIn, X, Slack, iMessage), generated at
// build time. Just the hero portrait, filling the frame - no name, no
// headline, no accent mark. The photo is the whole card.

export const alt = "Gjorgi Krmzov";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const portrait = await readFile(join(process.cwd(), "public/gjorgi.png"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f6f6f7",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${portrait.toString("base64")}`}
          alt="Gjorgi Krmzov"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    size
  );
}
