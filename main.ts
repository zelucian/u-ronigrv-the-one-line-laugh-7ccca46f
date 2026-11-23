import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one funny line, a single sentence of at most 200 characters.
const LINE =
  "The recipe said 'serves four', so I ate it alone and learned it serves one liar.";

// Defensive gate: the sealed scorer requires UTF-8 text of 1-200 characters,
// not only whitespace, as a single line. Fail loudly rather than emit a bad file.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(
    `entry line must be 1-200 characters, got ${LINE.length}`,
  );
}
if (LINE !== LINE.trim()) {
  throw new Error("entry line must not have leading or trailing whitespace");
}
if (/[\n\r]/.test(LINE)) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
