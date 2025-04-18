/*
  Warnings:

  - You are about to drop the `Slide` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_userId_fkey";

-- DropTable
DROP TABLE "Slide";

-- CreateTable
CREATE TABLE "Presentation" (
    "id" TEXT NOT NULL,
    "content_input" TEXT NOT NULL,
    "system_instruction" TEXT NOT NULL,
    "tone" TEXT,
    "verbosity" INTEGER,
    "goal" TEXT,
    "audiance" TEXT,
    "familiarity" TEXT,
    "presentation_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Presentation" ADD CONSTRAINT "Presentation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
