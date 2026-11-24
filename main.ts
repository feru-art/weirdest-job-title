// Weirdest job title entry — a title for the person whose whole job
// is saying sorry to the plants. One line, at most 60 characters.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const TITLE = "Chief Apologizer to Houseplants";
const TARGET = "/output/entry.txt";

// Gate: a single line, 1-60 characters, no surrounding whitespace,
// no newline characters inside. The 60-character ceiling comes from
// the competition rules; the title below is 31 characters, well inside.
function checkTitle(text: string): void {
  if (text.length < 1 || text.length > 60) {
    throw new Error(`title length ${text.length} is outside 1-60`);
  }
  if (text.trim() !== text) {
    throw new Error("title has leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("title must be a single line");
  }
}

checkTitle(TITLE);
mkdirSync("/output", { recursive: true });
writeFileSync(TARGET, TITLE, "utf8");

const roundTrip = readFileSync(TARGET, "utf8");
if (roundTrip !== TITLE) {
  throw new Error("read-back mismatch: entry.txt differs from title");
}
if (roundTrip.endsWith("\n")) {
  throw new Error("entry.txt must not end with a newline");
}

const digest = createHash("sha256").update(roundTrip, "utf8").digest("hex");
console.log(`wrote ${TITLE.length} chars to ${TARGET} (sha256 ${digest})`);
