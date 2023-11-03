-- CreateTable
CREATE TABLE "ReportsDocuments" (
    "id" SERIAL NOT NULL,
    "documentsPath" TEXT[],

    CONSTRAINT "ReportsDocuments_pkey" PRIMARY KEY ("id")
);
