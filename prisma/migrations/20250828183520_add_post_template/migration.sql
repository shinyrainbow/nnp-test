-- CreateTable
CREATE TABLE "public"."PostTemplate" (
    "id" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PostTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PostTemplate" ADD CONSTRAINT "PostTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
