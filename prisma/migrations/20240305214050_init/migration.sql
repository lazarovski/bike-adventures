-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(50),
    "lastName" VARCHAR(50),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isDisabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" VARCHAR(1024) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "accountId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("accountId","activityId")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" VARCHAR(1024) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER NOT NULL,
    "distanceInKm" DECIMAL(3,1) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startLocationId" TEXT NOT NULL,
    "endLocationId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" VARCHAR(512) NOT NULL,
    "latitude" DECIMAL(9,9),
    "longitude" DECIMAL(9,6),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE INDEX "Account_email_idx" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_accountId_key" ON "Activity"("accountId");

-- CreateIndex
CREATE INDEX "Activity_name_description_idx" ON "Activity"("name", "description");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_accountId_key" ON "Participant"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_activityId_key" ON "Participant"("activityId");

-- CreateIndex
CREATE UNIQUE INDEX "Route_startLocationId_key" ON "Route"("startLocationId");

-- CreateIndex
CREATE UNIQUE INDEX "Route_endLocationId_key" ON "Route"("endLocationId");

-- CreateIndex
CREATE UNIQUE INDEX "Route_activityId_key" ON "Route"("activityId");

-- CreateIndex
CREATE INDEX "Route_name_idx" ON "Route"("name");

-- CreateIndex
CREATE INDEX "Location_name_idx" ON "Location"("name");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_startLocationId_fkey" FOREIGN KEY ("startLocationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_endLocationId_fkey" FOREIGN KEY ("endLocationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
