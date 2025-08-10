import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Parser } from 'json2csv'
import type { Prisma } from '@prisma/client'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const keyword = params.get('q') || undefined
  const industries = params.getAll('industry')
  const states = params.getAll('state')
  const statuses = params.getAll('status')
  const revenueMin = params.get('revenueMin') ? Number(params.get('revenueMin')) : undefined
  const revenueMax = params.get('revenueMax') ? Number(params.get('revenueMax')) : undefined
  const marginMin = params.get('marginMin') ? Number(params.get('marginMin')) : undefined
  const marginMax = params.get('marginMax') ? Number(params.get('marginMax')) : undefined
  const limit = params.get('limit') ? Number(params.get('limit')) : 50
  const offset = params.get('offset') ? Number(params.get('offset')) : 0

  const where: Prisma.BusinessWhereInput = {}
  if (keyword) {
    where.OR = [
      { name: { contains: keyword, mode: 'insensitive' } },
      { ownerName: { contains: keyword, mode: 'insensitive' } },
      { email: { contains: keyword, mode: 'insensitive' } },
    ]
  }
  if (industries.length) where.industry = { in: industries }
  if (states.length) where.state = { in: states }
  if (statuses.length) where.status = { in: statuses }
  const rangeAND: Prisma.BusinessWhereInput[] = []
  if (revenueMin !== undefined) rangeAND.push({ revenueMin: { gte: revenueMin } })
  if (revenueMax !== undefined) rangeAND.push({ revenueMax: { lte: revenueMax } })
  if (marginMin !== undefined) rangeAND.push({ marginMin: { gte: marginMin } })
  if (marginMax !== undefined) rangeAND.push({ marginMax: { lte: marginMax } })
  if (rangeAND.length) where.AND = rangeAND

  const businesses = await prisma.business.findMany({
    where,
    skip: offset,
    take: limit,
    orderBy: { name: 'asc' },
  })

  if (params.get('format') === 'csv') {
    const parser = new Parser()
    const csv = parser.parse(businesses)
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="businesses.csv"',
      },
    })
  }

  return NextResponse.json(businesses)
}
