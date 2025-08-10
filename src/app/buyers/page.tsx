diff --git a//dev/null b/src/app/buyers/page.tsx
index 0000000000000000000000000000000000000000..96b6ae489b02d75a5a3d5c16fa0cc2f2f6faa5a6 100644
--- a//dev/null
+++ b/src/app/buyers/page.tsx
@@ -0,0 +1,34 @@
+import { prisma } from '@/lib/prisma'
+
+export default async function BuyersPage() {
+  const buyers = await prisma.buyer.findMany({ orderBy: { name: 'asc' } })
+  return (
+    <main className="p-4">
+      <h1 className="text-xl mb-4">Buyers</h1>
+      <table className="w-full text-sm">
+        <thead>
+          <tr className="text-left border-b">
+            <th className="p-2">Name</th>
+            <th className="p-2">Industries</th>
+            <th className="p-2">Locations</th>
+            <th className="p-2">Revenue</th>
+            <th className="p-2">Deal Structure</th>
+            <th className="p-2">Contact</th>
+          </tr>
+        </thead>
+        <tbody>
+          {buyers.map((b) => (
+            <tr key={b.id} className="border-b">
+              <td className="p-2">{b.name}</td>
+              <td className="p-2">{b.industries.join(', ')}</td>
+              <td className="p-2">{b.locations.join(', ')}</td>
+              <td className="p-2">{b.revenueMin} - {b.revenueMax}</td>
+              <td className="p-2">{b.dealStructure}</td>
+              <td className="p-2">{b.contactEmail}</td>
+            </tr>
+          ))}
+        </tbody>
+      </table>
+    </main>
+  )
+}
