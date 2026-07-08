-- CreateTable
CREATE TABLE "IpPool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rangeIp" TEXT NOT NULL,
    "routerId" TEXT,

    CONSTRAINT "IpPool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IpPool_name_key" ON "IpPool"("name");

-- CreateIndex
CREATE UNIQUE INDEX "IpPool_rangeIp_key" ON "IpPool"("rangeIp");

-- AddForeignKey
ALTER TABLE "IpPool" ADD CONSTRAINT "IpPool_routerId_fkey" FOREIGN KEY ("routerId") REFERENCES "Router"("id") ON DELETE SET NULL ON UPDATE CASCADE;
