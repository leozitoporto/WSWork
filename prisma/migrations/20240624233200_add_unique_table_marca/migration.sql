/*
  Warnings:

  - A unique constraint covering the columns `[nome_marca]` on the table `marcas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "marcas_nome_marca_key" ON "marcas"("nome_marca");
