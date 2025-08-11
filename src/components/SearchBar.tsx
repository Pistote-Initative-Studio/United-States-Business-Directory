"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Filters = {
  state: string;
  industry: string;
  revMin: string;
  revMax: string;
};

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<Filters>({
    state: "",
    industry: "",
    revMin: "",
    revMax: "",
  });

  const popRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onOutside(e: MouseEvent) {
      if (!popRef.current) return;
      if (!popRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onEsc);
    document.addEventListener("mousedown", onOutside);
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.removeEventListener("mousedown", onOutside);
    };
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (f.state) params.set("state", f.state);
    if (f.industry) params.set("industry", f.industry);
    if (f.revMin) params.set("revMin", f.revMin);
    if (f.revMax) params.set("revMax", f.revMax);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8">
      <div className="relative">
        <button
          type="button"
          aria-label="Open filters"
          onClick={() => setOpen((v) => !v)}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50"
        >
          Filters
        </button>

        <input
          className="w-full rounded-md border border-gray-300 py-3 pl-24 pr-28 outline-none focus:border-gray-400"
          placeholder="Search by name, city, tag…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Search
        </button>

        {open && (
          <>
            <div className="absolute left-0 right-0 top-14 z-20" ref={popRef}>
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm text-gray-600">State</label>
                    <input
                      className="mt-1 w-full rounded-md border p-2"
                      placeholder="e.g., WA"
                      value={f.state}
                      onChange={(e) =>
                        setF((s) => ({ ...s, state: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Industry / NAICS
                    </label>
                    <input
                      className="mt-1 w-full rounded-md border p-2"
                      placeholder="e.g., 238220"
                      value={f.industry}
                      onChange={(e) =>
                        setF((s) => ({ ...s, industry: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Revenue ≥
                    </label>
                    <input
                      className="mt-1 w-full rounded-md border p-2"
                      placeholder="e.g., 1000000"
                      value={f.revMin}
                      onChange={(e) =>
                        setF((s) => ({ ...s, revMin: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Revenue ≤
                    </label>
                    <input
                      className="mt-1 w-full rounded-md border p-2"
                      placeholder="e.g., 10000000"
                      value={f.revMax}
                      onChange={(e) =>
                        setF((s) => ({ ...s, revMax: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setF({ state: "", industry: "", revMin: "", revMax: "" })
                    }
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Clear filters
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-gray-800"
                    >
                      Apply & search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-10 bg-black/5" />
          </>
        )}
      </div>
    </form>
  );
}
