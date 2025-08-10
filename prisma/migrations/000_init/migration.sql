diff --git a//dev/null b/prisma/migrations/000_init/migration.sql
index 0000000000000000000000000000000000000000..628b98c4335d4e61ff2529818870405b92306ef0 100644
--- a//dev/null
+++ b/prisma/migrations/000_init/migration.sql
@@ -0,0 +1,45 @@
+CREATE EXTENSION IF NOT EXISTS pg_trgm;
+
+CREATE TABLE "Business" (
+  "id" TEXT PRIMARY KEY,
+  "name" TEXT NOT NULL,
+  "ownerName" TEXT,
+  "email" TEXT,
+  "phone" TEXT,
+  "location" TEXT,
+  "state" TEXT,
+  "industry" TEXT,
+  "revenueMin" INTEGER,
+  "revenueMax" INTEGER,
+  "marginMin" INTEGER,
+  "marginMax" INTEGER,
+  "notes" TEXT,
+  "status" TEXT,
+  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
+  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
+);
+
+CREATE TABLE "Buyer" (
+  "id" TEXT PRIMARY KEY,
+  "name" TEXT NOT NULL,
+  "industries" TEXT[] DEFAULT '{}',
+  "locations" TEXT[] DEFAULT '{}',
+  "revenueMin" INTEGER,
+  "revenueMax" INTEGER,
+  "dealStructure" TEXT,
+  "contactEmail" TEXT,
+  "contactPhone" TEXT,
+  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
+  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
+);
+
+CREATE TABLE "Match" (
+  "id" TEXT PRIMARY KEY,
+  "buyerId" TEXT NOT NULL REFERENCES "Buyer"("id") ON DELETE CASCADE,
+  "businessId" TEXT NOT NULL REFERENCES "Business"("id") ON DELETE CASCADE,
+  "createdAt" TIMESTAMPTZ DEFAULT NOW()
+);
+
+CREATE INDEX "business_name_trgm_idx" ON "Business" USING gin ("name" gin_trgm_ops);
+CREATE INDEX "business_owner_trgm_idx" ON "Business" USING gin ("ownerName" gin_trgm_ops);
+CREATE INDEX "business_email_trgm_idx" ON "Business" USING gin ("email" gin_trgm_ops);
