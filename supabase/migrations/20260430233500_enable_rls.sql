-- Enable Row Level Security for tables identified in security audit
ALTER TABLE "public"."_prisma_migrations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Article" ENABLE ROW LEVEL SECURITY;

-- Note: By enabling RLS without adding any policies, all access via the 
-- Supabase API (PostgREST) is denied by default. This is the correct 
-- configuration when using a custom backend like NestJS that handles its 
-- own authentication and data access.
