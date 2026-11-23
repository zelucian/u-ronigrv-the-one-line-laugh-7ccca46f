import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one funny line, a single sentence of at most 200 characters.
const LINE =
  "The recipe said 'serves four', so I ate it alone and learned it serves one liar.";

// Gate mirroring the sealed scorer's rule: entry must be 1-200 chars,
// not only whitespace, as a single line. Fail loudly rather than emit a bad file.
function assertValidLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(
      `entry line must be 1-200 characters, got ${line.length}`,
    );
  }
  if (line !== line.trim()) {
    throw new Error("entry line must not have leading or trailing whitespace");
  }
  if (/[\n\r]/.test(line)) {
    throw new Error("entry line must be a single line");
  }
}

assertValidLine(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
