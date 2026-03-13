/*
  Warnings:

  - A unique constraint covering the columns `[userId,childId]` on the table `royal_qualifier` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `plan_purchases` DROP FOREIGN KEY `plan_purchases_approved_by_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `royal_qualifier_userId_childId_key` ON `royal_qualifier`(`userId`, `childId`);

-- AddForeignKey
ALTER TABLE `plan_purchases` ADD CONSTRAINT `plan_purchases_approved_by_fkey` FOREIGN KEY (`approved_by`) REFERENCES `aa_0_admin_db`(`admin_id`) ON DELETE SET NULL ON UPDATE CASCADE;
