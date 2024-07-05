import { Prisma, Modelo } from '@prisma/client'

export interface ModelsRepository {
  findById(id: string): Promise<Modelo | null>
  searchMany(query: string, page: number): Promise<Modelo[]>
  findByModel(model: string): Promise<Modelo | null>
  create(data: Prisma.ModeloUncheckedCreateInput): Promise<Modelo>
  save(
    brandId: string,
    marca_id: string,
    nome: string,
    valor_fipe: number
  ): Promise<Modelo>
  delete(id: string): Promise<Modelo | null>
}
