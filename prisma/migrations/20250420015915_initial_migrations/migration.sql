-- AlterTable
ALTER TABLE "Presentation" ADD COLUMN     "generated_content" TEXT,
ADD COLUMN     "no_of_slides" INTEGER,
ALTER COLUMN "content_input" DROP NOT NULL,
ALTER COLUMN "system_instruction" DROP NOT NULL,
ALTER COLUMN "presentation_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;
