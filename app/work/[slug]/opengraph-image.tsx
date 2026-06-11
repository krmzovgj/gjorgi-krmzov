import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getProject } from "../../data/projects";

// Per-project 1200x630 share card: project name + the money/time metric, so a
// case-study link dropped in a LinkedIn post or DM carries its own proof
// instead of a generic brand card. (The root opengraph-image does not cascade
// into this segment, so without this file these pages share with no image.)

export const alt = "Case study by Gjorgi Krmzov";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
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
          background: "#f6f6f7",
          color: "#0e0e0f",
          padding: "64px 72px 72px",
          fontFamily: "Bricolage Grotesque",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            letterSpacing: "-0.01em",
          }}
        >
          Gjorgi Krmzov
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

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}
          >
            {project?.name ?? "Gjorgi Krmzov"}
          </div>
          {project?.metric && (
            <div
              style={{
                marginTop: 28,
                fontSize: 36,
                letterSpacing: "-0.01em",
                color: "#56565a",
              }}
            >
              {project.metric}
            </div>
          )}
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
