/*
  Warnings:

  - You are about to drop the column `apiPort` on the `Router` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Router` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Router` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ipAddress]` on the table `Router` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Router" DROP COLUMN "apiPort",
DROP COLUMN "status",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Router_name_key" ON "Router"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Router_ipAddress_key" ON "Router"("ipAddress");
