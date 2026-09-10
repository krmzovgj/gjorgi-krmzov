import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";

// 1200x630 link-preview card (LinkedIn, X, Slack, iMessage), generated at
// build time. Just the hero portrait, filling the frame - no name, no
// headline, no accent mark. The photo is the whole card.

const PORTRAIT = join(process.cwd(), "public/gjorgi.png");

export const alt = "Gjorgi Krmzov";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The cache-bust hash Next appends to /opengraph-image is derived from THIS
// file's source, not from the portrait it reads. Swapping the photo therefore
// changed the card but left its URL byte-identical, so every cache keyed on
// that URL (LinkedIn, X, Slack, and Google's image cache) kept serving the old
// picture. generateImageMetadata puts an id in the path instead, so hashing the
// portrait here makes the URL move whenever the photo does.
export async function generateImageMetadata() {
  const portrait = await readFile(PORTRAIT);
  const id = createHash("sha256").update(portrait).digest("hex").slice(0, 12);
  return [{ id, alt, size, contentType }];
}

export default async function Image() {
  const portrait = await readFile(PORTRAIT);

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
