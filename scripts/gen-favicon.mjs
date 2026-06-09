// One-time favicon generator. Renders the G mark from app/icon.svg into a
// black-on-transparent PNG (app/icon.png) and a multi-size ICO (app/favicon.ico).
// Run: node scripts/gen-favicon.mjs  -- then commit the generated files.
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const SIZE = 512;
const PAD = 0.12; // 12% each side -> the mark fills ~76% of the canvas

// Pull the G path straight from the existing favicon source.
const src = await readFile(new URL("../app/icon.svg", import.meta.url), "utf8");
const d = src.match(/\sd="([^"]+)"/)?.[1];
if (!d) throw new Error("Could not find the G path in app/icon.svg");

// Bounds of the G mark in the path's own coordinate space.
const BW = 140.4;
const BH = 164.64;
const scale = (SIZE * (1 - 2 * PAD)) / Math.max(BW, BH);
const tx = (SIZE - BW * scale) / 2;
const ty = (SIZE - BH * scale) / 2;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}"><path transform="translate(${tx} ${ty}) scale(${scale})" d="${d}" fill="#111111"/></svg>`;
const svgBuf = Buffer.from(svg);

const render = (px) =>
  sharp(svgBuf, { density: 384 })
    .resize(px, px, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

// 512 PNG -> app/icon.png
const png512 = await render(SIZE);
await writeFile(new URL("../app/icon.png", import.meta.url), png512);

// Multi-size ICO (16/32/48) -> app/favicon.ico (PNG-compressed entries)
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(icoSizes.map(render));
await writeFile(new URL("../app/favicon.ico", import.meta.url), buildIco(icoPngs, icoSizes));

console.log(`icon.png: ${png512.length} bytes (${SIZE}x${SIZE})`);
console.log(`favicon.ico: ${icoSizes.join("/")} px entries`);

function buildIco(buffers, sizes) {
  const count = buffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(count, 4);
  let offset = 6 + count * 16;
  const dir = buffers.map((buf, i) => {
    const e = Buffer.alloc(16);
    const s = sizes[i];
    e.writeUInt8(s >= 256 ? 0 : s, 0); // width
    e.writeUInt8(s >= 256 ? 0 : s, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(buf.length, 8); // bytes in resource
    e.writeUInt32LE(offset, 12); // offset
    offset += buf.length;
    return e;
  });
  return Buffer.concat([header, ...dir, ...buffers]);
}
