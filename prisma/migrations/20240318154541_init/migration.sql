-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "role" "Role"[] DEFAULT ARRAY['USER']::"Role"[];
