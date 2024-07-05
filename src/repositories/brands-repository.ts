import { Prisma, Marca } from '@prisma/client'

export interface BrandsRepository {
  findById(id: string): Promise<Marca | null>
  findByBrand(brand: string): Promise<Marca | null>
  searchMany(query: string, page: number): Promise<Marca[]>
  create(data: Prisma.MarcaCreateInput): Promise<Marca>
  save(brandId: string, nome_marca: string): Promise<Marca>
  delete(id: string): Promise<Marca | null>
}
