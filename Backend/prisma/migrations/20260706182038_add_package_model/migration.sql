-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "type" TEXT NOT NULL DEFAULT 'prepaid',
    "limitType" TEXT NOT NULL DEFAULT 'unlimited',
    "bandwidth" TEXT NOT NULL,
    "validity" TEXT NOT NULL,
    "timeLimit" TEXT NOT NULL DEFAULT 'Unlimited',
    "dataLimit" TEXT NOT NULL DEFAULT 'Unlimited',
    "routerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Package_name_key" ON "Package"("name");

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_routerId_fkey" FOREIGN KEY ("routerId") REFERENCES "Router"("id") ON DELETE SET NULL ON UPDATE CASCADE;
