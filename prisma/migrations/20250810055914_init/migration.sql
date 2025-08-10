-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "industryCode" TEXT,
    "industryLabel" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "country" TEXT DEFAULT 'USA',
    "ownerName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "linkedinUrl" TEXT,
    "website" TEXT,
    "revenueLow" INTEGER,
    "revenueHigh" INTEGER,
    "ebitdaMargin" DECIMAL(5,2),
    "notes" TEXT,
    "source" TEXT,
    "status" TEXT NOT NULL DEFAULT 'cold',
    "dedupeKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buyer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "buyerType" TEXT,
    "industryFocus" TEXT[],
    "locationFocus" TEXT[],
    "revenueMin" INTEGER,
    "revenueMax" INTEGER,
    "ebitdaMin" DECIMAL(5,2),
    "ebitdaMax" DECIMAL(5,2),
    "dealType" TEXT[],
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "linkedinUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "matchNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_dedupeKey_key" ON "Business"("dedupeKey");

-- CreateIndex
CREATE UNIQUE INDEX "Match_businessId_buyerId_key" ON "Match"("businessId", "buyerId");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
