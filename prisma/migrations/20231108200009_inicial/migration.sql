-- CreateTable
CREATE TABLE "Units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,

    CONSTRAINT "Units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cards" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "requester" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardDocuments" (
    "id" SERIAL NOT NULL,
    "documentsPath" TEXT[],
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "CardDocuments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardDocuments" ADD CONSTRAINT "CardDocuments_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
