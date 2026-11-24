import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one-line fortune this entry submits: wisdom a tired senior
// engineer would nod at — 108 characters, 110 bytes in UTF-8.
const line =
  "Your code will outlive you. Write it like the next maintainer is a tired senior engineer — because they are.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outFile = join(outDir, "entry.txt");

// The competition wants a single line — fail loudly if a newline ever
// sneaks in, instead of shipping a broken entry.
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("line must be exactly one line");
}

writeFileSync(outFile, line, "utf8");

// Read it back and confirm the file holds exactly the line, byte for byte.
const written = readFileSync(outFile, "utf8");
if (written !== line) {
  throw new Error("entry.txt does not match the line exactly");
}
if (written.endsWith("\n") || written.endsWith("\r")) {
  throw new Error("entry.txt must not end with a newline");
}
console.log(`Wrote ${Buffer.byteLength(written, "utf8")} bytes to ${outFile}`);
