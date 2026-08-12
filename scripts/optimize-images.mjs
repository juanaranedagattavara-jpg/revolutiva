// Converts all legacy images (root-level loose files + named subfolders) to
// WebP, resizing anything wider than 2000px. Replaces originals in place
// (same path, .webp extension) so git tracks only the optimized versions.
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const FOLDERS = [
  "Amalurra",
  "Cerro Guido",
  "KodKod",
  "La Baita",
  "Llama Trek",
  "Malinali",
  "Nueva carpeta",
  "ONCE",
  "Selva Bananito",
  "Yachaqs",
];

const IMAGE_EXT = /\.(jpe?g|avif|png)$/i;

function collectImages(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && IMAGE_EXT.test(entry.name)) {
      out.push(join(dir, entry.name));
    }
  }
  return out;
}

const files = [
  ...collectImages(root),
  ...FOLDERS.flatMap((f) => {
    const dir = join(root, f);
    try {
      statSync(dir);
      return collectImages(dir);
    } catch {
      return [];
    }
  }),
];

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const before = statSync(file).size;
  const out = file.replace(extname(file), ".webp");
  await sharp(file)
    .rotate()
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  const after = statSync(out).size;
  totalBefore += before;
  totalAfter += after;
  unlinkSync(file);
  console.log(`${file.replace(root + "/", "")} → ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`);
}

console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (${files.length} files)`);
