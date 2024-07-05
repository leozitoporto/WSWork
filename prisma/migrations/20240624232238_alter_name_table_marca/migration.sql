/*
  Warnings:

  - You are about to drop the column `nome_marcas` on the `marcas` table. All the data in the column will be lost.
  - Added the required column `nome_marca` to the `marcas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "marcas" DROP COLUMN "nome_marcas",
ADD COLUMN     "nome_marca" TEXT NOT NULL;
