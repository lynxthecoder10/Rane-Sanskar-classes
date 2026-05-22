// Server-side validation library — NEVER trust the client
// All form inputs pass through here before hitting the database

export type EnquiryInput = {
  student_name: string;
  parent_name: string;
  phone: string;
  email?: string;
  standard: string;
  board?: string;
  message?: string;
};

export type ValidationResult =
  | { success: true; data: EnquiryInput }
  | { success: false; error: string };

const VALID_STANDARDS = [
  "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th",
  "9th (SSC)", "9th (ICSE)", "10th (SSC)", "10th (ICSE)",
  "11th Commerce", "11th Science", "12th Commerce", "12th Science",
];

const VALID_BOARDS = ["SSC", "ICSE", "CBSE", "HSC", ""];

// Strips HTML tags and dangerous characters to prevent XSS
function sanitize(str: string): string {
  return str
    .replace(/<[^>]*>/g, "") // remove HTML tags
    .replace(/[<>'"]/g, "")  // remove remaining dangerous chars
    .trim()
    .slice(0, 500);           // hard cap at 500 chars
}

function isValidPhone(phone: string): boolean {
  // Allow Indian mobile formats: +91XXXXXXXXXX or 10-digit numbers
  return /^(\+91[\s-]?)?[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, ""));
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateEnquiry(raw: unknown): ValidationResult {
  if (typeof raw !== "object" || raw === null) {
    return { success: false, error: "Invalid request body." };
  }

  const body = raw as Record<string, unknown>;

  // Required fields
  const student_name = typeof body.student_name === "string" ? sanitize(body.student_name) : "";
  const parent_name = typeof body.parent_name === "string" ? sanitize(body.parent_name) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const standard = typeof body.standard === "string" ? body.standard.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const board = typeof body.board === "string" ? body.board.trim() : "";
  const message = typeof body.message === "string" ? sanitize(body.message) : "";

  if (!student_name || student_name.length < 2) {
    return { success: false, error: "Student name must be at least 2 characters." };
  }
  if (student_name.length > 100) {
    return { success: false, error: "Student name is too long." };
  }

  if (!parent_name || parent_name.length < 2) {
    return { success: false, error: "Parent name must be at least 2 characters." };
  }
  if (parent_name.length > 100) {
    return { success: false, error: "Parent name is too long." };
  }

  if (!phone || !isValidPhone(phone)) {
    return { success: false, error: "Please enter a valid Indian mobile number." };
  }

  if (email && !isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (!VALID_STANDARDS.includes(standard)) {
    return { success: false, error: "Please select a valid standard." };
  }

  if (board && !VALID_BOARDS.includes(board)) {
    return { success: false, error: "Please select a valid board." };
  }

  if (message.length > 1000) {
    return { success: false, error: "Message is too long (max 1000 characters)." };
  }

  return {
    success: true,
    data: {
      student_name,
      parent_name,
      phone,
      email: email || undefined,
      standard,
      board: board || undefined,
      message: message || undefined,
    },
  };
}
