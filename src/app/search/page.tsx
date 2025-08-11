import SearchBar from "@/components/SearchBar";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const q = searchParams.q ?? "";
  const state = searchParams.state ?? "";
  const industry = searchParams.industry ?? "";
  const revMin = Number(searchParams.revMin ?? 0);
  const revMax = Number(searchParams.revMax ?? 0);

  // TODO: Replace this with real DB query
  const items: Array<{
    id: string;
    name: string;
    city: string;
    state: string;
    tags: string[];
  }> = [];

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      {/* Keep search bar visible */}
      <SearchBar />

      <p className="mt-4 text-sm text-gray-600">
        Showing results for: <strong>{q || "All"}</strong>
        {state && ` · ${state}`}
        {industry && ` · ${industry}`}
        {(revMin || revMax) &&
          ` · Revenue ${revMin ? "≥ " + revMin : ""}${
            revMax ? " ≤ " + revMax : ""
          }`}
      </p>

      <div className="mt-6 divide-y rounded-lg border">
        {items.length === 0 ? (
          <div className="p-6 text-gray-500">No results yet.</div>
        ) : (
          items.map((b) => (
            <div key={b.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{b.name}</h3>
                  <p className="text-sm text-gray-600">
                    {b.city}, {b.state}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {b.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
