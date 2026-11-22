// The World Herald — Saturday 21 November 2026.
// The front page is rendered from index.html and kept in this repo as
// entry.png. This script checks that file is a real 1024x1024 PNG under
// the 1 MiB limit and copies it unchanged to the output directory.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error("entry.png is missing from the repository");
}
const bytes = readFileSync(source);

// PNG signature: 89 50 4E 47 0D 0A 1A 0A
const magic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
for (let i = 0; i < magic.length; i++) {
  if (bytes[i] !== magic[i]) {
    throw new Error("entry.png is not a PNG file");
  }
}

// IHDR chunk: width and height are big-endian uint32 at offsets 16 and 20.
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png must be 1024x1024, got ${width}x${height}`);
}
if (bytes.length > 1024 * 1024) {
  throw new Error(`entry.png must be at most 1 MiB, got ${bytes.length} bytes`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, bytes);
console.log(`copied entry.png (${bytes.length} bytes, 1024x1024) to ${target}`);
