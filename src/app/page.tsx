diff --git a//dev/null b/src/app/page.tsx
index 0000000000000000000000000000000000000000..1ab03247180abb0b0cfdb7d8a38dbcf961feecf3 100644
--- a//dev/null
+++ b/src/app/page.tsx
@@ -0,0 +1,168 @@
+'use client'
+
+import { useEffect, useState, useCallback } from 'react'
+import type { Business } from '@prisma/client'
+
+const industriesList = ['Tech', 'Healthcare', 'Retail']
+const statesList = ['CA', 'NY', 'TX']
+const statusList = ['new', 'contacted', 'closed']
+
+export default function Home() {
+  const [keyword, setKeyword] = useState('')
+  const [industries, setIndustries] = useState<string[]>([])
+  const [states, setStates] = useState<string[]>([])
+  const [statuses, setStatuses] = useState<string[]>([])
+  const [revenue, setRevenue] = useState<[number, number]>([0, 1000000])
+  const [margin, setMargin] = useState<[number, number]>([0, 100])
+  const [data, setData] = useState<Business[]>([])
+  const search = useCallback(async (format?: string) => {
+    const params = new URLSearchParams()
+    if (keyword) params.set('q', keyword)
+    industries.forEach((i) => params.append('industry', i))
+    states.forEach((s) => params.append('state', s))
+    statuses.forEach((s) => params.append('status', s))
+    params.set('revenueMin', String(revenue[0]))
+    params.set('revenueMax', String(revenue[1]))
+    params.set('marginMin', String(margin[0]))
+    params.set('marginMax', String(margin[1]))
+
+    const url = '/api/search?' + params.toString() + (format === 'csv' ? '&format=csv' : '')
+    if (format === 'csv') {
+      const res = await fetch(url)
+      const blob = await res.blob()
+      const link = document.createElement('a')
+      link.href = URL.createObjectURL(blob)
+      link.download = 'businesses.csv'
+      link.click()
+      return
+    }
+    const res = await fetch(url)
+    const json: Business[] = await res.json()
+    setData(json)
+  }, [keyword, industries, states, statuses, revenue, margin])
+
+  useEffect(() => {
+    search()
+  }, [search])
+
+  return (
+    <main className="p-4 space-y-4">
+      <div className="flex flex-wrap gap-2 items-end">
+        <input
+          className="border p-2"
+          placeholder="Keyword"
+          value={keyword}
+          onChange={(e) => setKeyword(e.target.value)}
+        />
+        <select
+          multiple
+          className="border p-2"
+          value={industries}
+          onChange={(e) =>
+            setIndustries(Array.from(e.target.selectedOptions).map((o) => o.value))
+          }
+        >
+          {industriesList.map((i) => (
+            <option key={i}>{i}</option>
+          ))}
+        </select>
+        <select
+          multiple
+          className="border p-2"
+          value={states}
+          onChange={(e) =>
+            setStates(Array.from(e.target.selectedOptions).map((o) => o.value))
+          }
+        >
+          {statesList.map((i) => (
+            <option key={i}>{i}</option>
+          ))}
+        </select>
+        <select
+          multiple
+          className="border p-2"
+          value={statuses}
+          onChange={(e) =>
+            setStatuses(Array.from(e.target.selectedOptions).map((o) => o.value))
+          }
+        >
+          {statusList.map((i) => (
+            <option key={i}>{i}</option>
+          ))}
+        </select>
+        <div className="flex flex-col">
+          <label>Revenue {revenue[0]} - {revenue[1]}</label>
+          <input
+            type="range"
+            min={0}
+            max={1000000}
+            value={revenue[0]}
+            onChange={(e) => setRevenue([Number(e.target.value), revenue[1]])}
+          />
+          <input
+            type="range"
+            min={0}
+            max={1000000}
+            value={revenue[1]}
+            onChange={(e) => setRevenue([revenue[0], Number(e.target.value)])}
+          />
+        </div>
+        <div className="flex flex-col">
+          <label>Margin {margin[0]} - {margin[1]}</label>
+          <input
+            type="range"
+            min={0}
+            max={100}
+            value={margin[0]}
+            onChange={(e) => setMargin([Number(e.target.value), margin[1]])}
+          />
+          <input
+            type="range"
+            min={0}
+            max={100}
+            value={margin[1]}
+            onChange={(e) => setMargin([margin[0], Number(e.target.value)])}
+          />
+        </div>
+        <button className="bg-blue-500 text-white px-3 py-2" onClick={() => search()}>
+          Search
+        </button>
+        <button className="border px-3 py-2" onClick={() => search('csv')}>
+          Export to CSV
+        </button>
+      </div>
+      <table className="w-full text-sm">
+        <thead>
+          <tr className="text-left border-b">
+            <th className="p-2">Name</th>
+            <th className="p-2">Owner</th>
+            <th className="p-2">Email</th>
+            <th className="p-2">Phone</th>
+            <th className="p-2">State</th>
+            <th className="p-2">Industry</th>
+            <th className="p-2">Revenue</th>
+            <th className="p-2">Margin</th>
+          </tr>
+        </thead>
+        <tbody>
+          {data.map((b) => (
+            <tr key={b.id} className="border-b">
+              <td className="p-2">{b.name}</td>
+              <td className="p-2">{b.ownerName}</td>
+              <td className="p-2">{b.email}</td>
+              <td className="p-2">{b.phone}</td>
+              <td className="p-2">{b.state}</td>
+              <td className="p-2">{b.industry}</td>
+              <td className="p-2">
+                {b.revenueMin} - {b.revenueMax}
+              </td>
+              <td className="p-2">
+                {b.marginMin} - {b.marginMax}
+              </td>
+            </tr>
+          ))}
+        </tbody>
+      </table>
+    </main>
+  )
+}
