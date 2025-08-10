diff --git a//dev/null b/src/lib/prisma.ts
index 0000000000000000000000000000000000000000..76df70ebcccc503d971927234082c603967259d7 100644
--- a//dev/null
+++ b/src/lib/prisma.ts
@@ -0,0 +1,11 @@
+import { PrismaClient } from '@prisma/client'
+
+const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
+
+export const prisma =
+  globalForPrisma.prisma ||
+  new PrismaClient({
+    log: ['query', 'error', 'warn'],
+  })
+
+if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
