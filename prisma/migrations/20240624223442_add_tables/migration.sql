-- CreateTable
CREATE TABLE "marcas" (
    "id" TEXT NOT NULL,
    "nome_marcas" TEXT NOT NULL,

    CONSTRAINT "marcas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valor_fipe" DECIMAL(65,30) NOT NULL,
    "marca_id" TEXT NOT NULL,

    CONSTRAINT "modelos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carros" (
    "id" TEXT NOT NULL,
    "timestamp_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ano" INTEGER NOT NULL DEFAULT 4,
    "combustivel" TEXT NOT NULL,
    "num_portas" INTEGER NOT NULL DEFAULT 2,
    "cor" TEXT NOT NULL,
    "modelo_id" TEXT NOT NULL,

    CONSTRAINT "carros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "modelos_nome_key" ON "modelos"("nome");

-- AddForeignKey
ALTER TABLE "modelos" ADD CONSTRAINT "modelos_marca_id_fkey" FOREIGN KEY ("marca_id") REFERENCES "marcas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carros" ADD CONSTRAINT "carros_modelo_id_fkey" FOREIGN KEY ("modelo_id") REFERENCES "modelos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
