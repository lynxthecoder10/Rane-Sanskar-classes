export const VALID_STANDARDS = [
  "Class VIII (SSC)",
  "Class VIII (ICSE)",
  "Class IX (SSC)",
  "Class IX (ICSE)",
  "Class X (SSC)",
  "Class X (ICSE)",
  "Class XI Commerce",
  "Class XI Science",
  "Class XII Commerce",
  "Class XII Science",
  "CA Foundation Prep",
  "CMA Foundation Prep",
  "Vocational Computer Courses",
] as const;

export const VALID_BOARDS = [
  "Maharashtra SSC / HSC",
  "ICSE / ISC Board",
  "CBSE Board",
  "University of Mumbai",
] as const;

export const STREAM_TO_STANDARD: Record<string, StandardOption> = {
  "xi-xii commerce": "Class XI Commerce",
  "syjc focus": "Class XII Commerce",
  "ca foundation": "CA Foundation Prep",
  "cma foundation": "CMA Foundation Prep",
  commerce: "Class XI Commerce",
  science: "Class XI Science",
  syjc: "Class XII Commerce",
  "ca foundation prep": "CA Foundation Prep",
  "cma foundation prep": "CMA Foundation Prep",
};

export type StandardOption = (typeof VALID_STANDARDS)[number];
export type BoardOption = (typeof VALID_BOARDS)[number];

export function normalizeStreamParam(stream: string | null): StandardOption | undefined {
  if (!stream) {
    return undefined;
  }

  return STREAM_TO_STANDARD[stream.toLowerCase().trim()];
}
