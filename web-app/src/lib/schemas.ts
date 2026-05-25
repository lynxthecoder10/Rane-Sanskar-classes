import { z } from "zod";
import { VALID_BOARDS, VALID_STANDARDS } from "./course-options";

function sanitizeText(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[<>"']/g, "")
    .trim();
}

function textField(min: number, max: number, fieldName: string) {
  return z
    .string()
    .trim()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(min, `${fieldName} must be at least ${min} characters`)
        .max(max, `${fieldName} is too long`)
    );
}

const OptionalEmailSchema = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().toLowerCase().email("Please enter a valid email address").max(200).optional()
);

const OptionalMessageSchema = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z
    .string()
    .trim()
    .transform(sanitizeText)
    .pipe(z.string().max(1000, "Message is too long"))
    .optional()
);

const PhoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s-]/g, ""))
  .transform((value) => (value.startsWith("+91") ? value.slice(3) : value))
  .refine((value) => /^[6-9]\d{9}$/.test(value), "Please enter a valid Indian mobile number");

export const EnquiryValidationSchema = z
  .object({
    student_name: textField(2, 100, "Student name"),
    parent_name: textField(2, 100, "Parent name"),
    email: OptionalEmailSchema,
    phone: PhoneSchema,
    standard: z.enum(VALID_STANDARDS, {
      error: "Please select a valid standard",
    }),
    board: z.enum(VALID_BOARDS, {
      error: "Please select a valid board",
    }),
    stream_selected: z.enum(VALID_STANDARDS).optional(),
    message: OptionalMessageSchema,
  })
  .strict()
  .transform((data) => ({
    ...data,
    stream_selected: data.stream_selected ?? data.standard,
    email: data.email ?? null,
    message: data.message ?? null,
  }));

export const AuthCredentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email address").max(200),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

export type EnquiryInput = z.output<typeof EnquiryValidationSchema>;
export type AuthCredentials = z.infer<typeof AuthCredentialsSchema>;
