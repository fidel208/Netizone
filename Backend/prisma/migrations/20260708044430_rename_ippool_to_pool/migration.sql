/*
  Warnings:

  - You are about to drop the `IpPool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IpPool" DROP CONSTRAINT "IpPool_routerId_fkey";

-- DropTable
DROP TABLE "IpPool";

-- CreateTable
CREATE TABLE "Pool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rangeIp" TEXT NOT NULL,
    "routerId" TEXT,

    CONSTRAINT "Pool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pool_name_key" ON "Pool"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pool_rangeIp_key" ON "Pool"("rangeIp");

-- AddForeignKey
ALTER TABLE "Pool" ADD CONSTRAINT "Pool_routerId_fkey" FOREIGN KEY ("routerId") REFERENCES "Router"("id") ON DELETE SET NULL ON UPDATE CASCADE;
