-- DropForeignKey
ALTER TABLE `plan_purchases` DROP FOREIGN KEY `plan_purchases_approved_by_fkey`;

-- DropIndex
DROP INDEX `royal_qualifier_userId_childId_key` ON `royal_qualifier`;

-- AddForeignKey
ALTER TABLE `plan_purchases` ADD CONSTRAINT `plan_purchases_approved_by_fkey` FOREIGN KEY (`approved_by`) REFERENCES `aa_0_admin_db`(`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;
