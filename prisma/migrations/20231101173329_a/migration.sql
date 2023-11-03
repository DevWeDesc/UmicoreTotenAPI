/*
  Warnings:

  - Added the required column `lead` to the `ReportsDocuments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportsDocuments" ADD COLUMN     "lead" INTEGER NOT NULL;
