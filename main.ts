// Weirdest Job Title: Blind Judge Showdown
// Entry: a single job title, 60 characters at most, written to /output/entry.txt.
// Winner of the local pairwise race (4/4): "Chief Apologizer to Houseplants"
// (31 characters). A formal job title for an absurdly specific job: the deadpan
// contrast between the title and the task is the joke, and the person doing it
// is instantly pictureable — exactly what the judge's brief rewards.
import { mkdirSync, writeFileSync } from "node:fs";

const TITLE = "Chief Apologizer to Houseplants";

// Self-check against the competition gate before writing: the sealed scorer
// requires UTF-8 text of 1 to 60 characters, not only whitespace. Fail loudly
// here rather than submitting an entry the gate would refuse.
const length = [...TITLE].length;
if (length < 1 || length > 60 || TITLE.trim().length === 0) {
  throw new Error(`Title fails the 1-60 character gate (got ${length} chars)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TITLE, "utf8");
