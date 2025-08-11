import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  return (
    <main className="bg-gray-100 min-h-screen px-4">
      <div className="bg-white rounded-lg shadow-md max-w-5xl mx-auto mt-8 min-h-[500px] overflow-hidden">
        
        {/* Red stripe on top of the card */}
        <div className="bg-red-600 h-2 w-full"></div>

        {/* Card content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                priority
                className="mr-3"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  US Business Directory
                </h1>
                <p className="text-sm text-gray-600">
                  Private, fast directory for acquisition sourcing.
                </p>
              </div>
            </div>

            <Link
              href="/buyers"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Buyer pool →
            </Link>
          </div>

          {/* Search Bar */}
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
