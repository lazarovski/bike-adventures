-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_activityId_fkey";

-- AlterTable
ALTER TABLE "Route" ALTER COLUMN "activityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
