This is a production-oriented Next.js + Supabase application for Rane's Sanskar Classes.
It includes the public marketing site, secure enquiry capture, Supabase Auth, protected student/admin areas, and database-backed portal metrics.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For this workspace the active local demo usually runs on [http://localhost:3001](http://localhost:3001).
Copy `.env.example` to `.env.local` and fill in the Supabase values before testing database-backed flows.

## Production Backend Setup

1. Apply the Supabase migrations in `supabase/migrations/`, including `production_schema.sql`.
2. Confirm the `profiles`, `enquiries`, `toppers`, `study_activity_logs`, `test_results`, `student_rank_snapshots`, and `notification_events` tables exist.
3. Confirm RLS is enabled and that admin access is tied to `profiles.role = 'admin'`.
4. Seed or promote at least one admin profile manually in Supabase SQL:

```sql
update public.profiles
set role = 'admin'
where id = '<supabase-auth-user-id>';
```

5. Run the verification commands:

```bash
npx.cmd tsc --noEmit
npm run lint
npm run build
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
