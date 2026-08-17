// Copies the legacy image folders/files (still at repo root, same layout as the
// original revolutiva-travel.html) into public/, which is where Next.js requires
// static assets to live. Runs automatically via the predev/prebuild npm hooks.
import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const FOLDERS = [
  "Amalurra",
  "Cerro Guido",
  "FlowMap",
  "KodKod",
  "La Baita",
  "Llama Trek",
  "Malinali",
  "Nueva carpeta",
  "ONCE",
  "Selva Bananito",
  "Yachaqs",
];

const IMAGE_EXT = /\.(jpe?g|avif|png|webp|JPG)$/i;

if (!existsSync(join(root, "public"))) mkdirSync(join(root, "public"));

for (const folder of FOLDERS) {
  const src = join(root, folder);
  if (existsSync(src)) {
    cpSync(src, join(root, "public", folder), { recursive: true });
  }
}

for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && IMAGE_EXT.test(entry.name)) {
    cpSync(join(root, entry.name), join(root, "public", entry.name));
  }
}

console.log("Synced legacy image assets into public/");
