# Security Policy - Rane's Sanskar Classes Website & PWA

This document outlines the security architecture, controls, and best practices aggressively enforced in the Rane's Sanskar Classes application.

## 1. Frontend & Infrastructure Security

### Cloudflare Integration (Recommended Production Setup)
For live deployments, ensure the domain is behind Cloudflare with the following parameters enabled:
- **SSL/TLS Mode:** Full (Strict)
- **Always Use HTTPS:** ON
- **Automatic HTTPS Rewrites:** ON
- **Security Features:** DDoS protection, Bot protection, rate limiting, and DNS masking.

### HTTP Security Headers
Configured in `next.config.ts` to prevent standard web vulnerabilities (XSS, Clickjacking, MIME sniffing):
- **Content-Security-Policy (CSP):** Restricts script, style, font, image, and connection sources to safe domains (`'self'`, Google Fonts, Supabase).
- **Strict-Transport-Security (HSTS):** Enforces HTTPS usage strictly (`max-age=63072000; includeSubDomains; preload`).
- **X-Frame-Options:** Prevents clickjacking (`SAMEORIGIN`).
- **X-Content-Type-Options:** Prevents MIME-sniffing (`nosniff`).
- **Referrer-Policy:** Safeguards referral data (`strict-origin-when-cross-origin`).
- **Permissions-Policy:** Restricts browser APIs (camera, microphone, and geolocation are disabled).
- **X-Powered-By Header:** Disabled (`poweredByHeader: false`) to avoid exposing server/framework details.

---

## 2. API Security & Rate Limiting

### Next.js Proxy Rate Limiting
- **Enquiry Endpoint Rate Limiting:** Implemented in `src/proxy.ts` for `/api/enquiry` and `/api/enquire`.
- **Limit:** Maximum of **5 enquiry submissions per minute per IP address**.
- **Response:** Responds with an HTTP `429 Too Many Requests` status to block spam/DDoS attempts on forms.

### Route Protection
- `/admin/:path*` and `/dashboard/:path*` are protected at the Next.js 16 proxy layer using Supabase Auth. Unauthenticated traffic is redirected to `/student-login`.
- `/admin/:path*` requires a trusted `profiles.role = 'admin'` database role. Non-admin users are redirected to `/dashboard`.
- Authenticated users are prevented from visiting `/student-login` and redirected to `/admin` or `/dashboard` based on role.

---

## 3. Server-Side Data Validation

### No Trust on Client Input
All form submissions are validated strictly on the server before entering the database via `src/lib/schemas.ts`:
- **Input Sanitization:** Zod-backed schemas normalize and sanitize text fields before database writes.
- **Field Constraints:** String lengths are strictly capped (e.g., student name max 100, message max 1000 characters).
- **Format Verification:** Indian mobile numbers are verified using regex `/^(\+91[\s-]?)?[6-9]\d{9}$/`. Email formats are strictly validated.
- **Allowed Lists:** Dropdown fields (standards, boards) are checked against a strict pre-defined array of valid values.

---

## 4. Supabase & Database Security

### Row Level Security (RLS)
- **Deny-by-Default:** Every table has Row Level Security (RLS) enabled.
- **Table: `enquiries`**
  - **anon (Public):** Only allowed to `INSERT` leads with safe default `status = 'new'`. Cannot select, update, or delete.
  - **authenticated Admin:** Full access is restricted to users whose trusted `profiles.role` is `admin`.
- **Student Data Isolation:** `profiles`, `study_activity_logs`, `test_results`, and `student_rank_snapshots` allow students to read only their own rows.
- **Public Results:** `toppers` is public read-only; admin write access is role-gated.
- **Data API Grants:** The production migration includes explicit grants for Supabase projects where new tables are not automatically exposed to PostgREST/Data API.

### API Environment Credentials
- **Server-Side Admin Operations:** The `supabaseAdmin` client is instantiated strictly on the server-side Next.js route using `SUPABASE_SERVICE_ROLE_KEY`.
- **Pre-execution Validation:** Although using the service role key bypasses RLS on the server, the API route performs the complete validation flow *before* inserting data into the database.
- **Notification Simulation:** New leads write a `lead.created` row to `notification_events`, allowing WhatsApp/email delivery to be added later without changing the form contract.

---

## 5. Development & Repository Discipline

### Git Secrets Protection
The `.gitignore` file strictly blocks the committing of sensitive files:
- `.env` and `.env.local` (where Supabase service role keys reside).
- `.next/` and `.vercel` directories.
- `node_modules/` and build directories.
