diff --git a//dev/null b/scripts/importBusinesses.ts
index 0000000000000000000000000000000000000000..0081314995a681e1da6ac8ee0ce96c2aafcc7f77 100644
--- a//dev/null
+++ b/scripts/importBusinesses.ts
@@ -0,0 +1,72 @@
+import fs from 'fs'
+import { parse } from 'csv-parse'
+import { prisma } from '../src/lib/prisma'
+
+interface CSVRow {
+  name: string
+  ownerName?: string
+  email?: string
+  phone?: string
+  location?: string
+  state?: string
+  industry?: string
+  revenueMin?: string
+  revenueMax?: string
+  marginMin?: string
+  marginMax?: string
+  notes?: string
+  status?: string
+}
+
+async function main() {
+  const file = process.argv[2]
+  if (!file) {
+    console.error('Usage: ts-node scripts/importBusinesses.ts <file>')
+    process.exit(1)
+  }
+
+  const rows: CSVRow[] = await new Promise((resolve, reject) => {
+    const r: CSVRow[] = []
+    fs.createReadStream(file)
+      .pipe(parse({ columns: true, trim: true }))
+      .on('data', (row) => r.push(row as CSVRow))
+      .on('end', () => resolve(r))
+      .on('error', reject)
+  })
+
+  for (const row of rows) {
+    const existing = await prisma.business.findFirst({
+      where: {
+        name: row.name,
+        state: row.state,
+        phone: row.phone,
+      },
+    })
+    if (existing) continue
+
+    await prisma.business.create({
+      data: {
+        name: row.name,
+        ownerName: row.ownerName,
+        email: row.email,
+        phone: row.phone,
+        location: row.location,
+        state: row.state,
+        industry: row.industry,
+        revenueMin: row.revenueMin ? Number(row.revenueMin) : undefined,
+        revenueMax: row.revenueMax ? Number(row.revenueMax) : undefined,
+        marginMin: row.marginMin ? Number(row.marginMin) : undefined,
+        marginMax: row.marginMax ? Number(row.marginMax) : undefined,
+        notes: row.notes,
+        status: row.status,
+      },
+    })
+  }
+
+  console.log('Import complete')
+}
+
+main().catch((e) => {
+  console.error(e)
+  process.exit(1)
+})
