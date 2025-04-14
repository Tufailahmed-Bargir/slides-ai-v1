-- CreateTable
CREATE TABLE "Slide" (
    "id" TEXT NOT NULL,
    "content_input" TEXT NOT NULL,
    "system_instruction" TEXT NOT NULL,
    "tone" TEXT NOT NULL,
    "verbosity" TEXT NOT NULL,
    "slide_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
