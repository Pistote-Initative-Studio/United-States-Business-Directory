import { prisma } from '@/lib/prisma'
import Link from 'next/link'

interface Props {
  searchParams: { buyer?: string }
}

export default async function MatchesPage({ searchParams }: Props) {
  const buyers = await prisma.buyer.findMany({ orderBy: { name: 'asc' } })
  const buyer = searchParams.buyer ? buyers.find((b) => b.id === searchParams.buyer) : undefined

  const businesses = buyer
    ? await prisma.business.findMany({
        where: {
          industry: { in: buyer.industries },
          state: { in: buyer.locations },
          revenueMin: { gte: buyer.revenueMin ?? undefined },
          revenueMax: { lte: buyer.revenueMax ?? undefined },
        },
      })
    : []

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl">Matches</h1>
      <div className="flex gap-2">
        {buyers.map((b) => (
          <Link
            key={b.id}
            href={`/matches?buyer=${b.id}`}
            className={`px-2 py-1 border ${buyer?.id === b.id ? 'bg-blue-500 text-white' : ''}`}
          >
            {b.name}
          </Link>
        ))}
      </div>
      {buyer && (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Name</th>
              <th className="p-2">State</th>
              <th className="p-2">Industry</th>
              <th className="p-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-2">{b.name}</td>
                <td className="p-2">{b.state}</td>
                <td className="p-2">{b.industry}</td>
                <td className="p-2">{b.revenueMin} - {b.revenueMax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
