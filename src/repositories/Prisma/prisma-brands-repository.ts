import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { BrandsRepository } from '../brands-repository'
import { Marca } from '@prisma/client'

export class PrismaBrandsRepository implements BrandsRepository {
  async findById(id: string) {
    const brand = await prisma.marca.findUnique({
      where: {
        id,
      },
    })

    return brand
  }

  async findByBrand(nome_marca: string) {
    const brand = await prisma.marca.findFirst({
      where: {
        nome_marca,
      },
    })

    return brand
  }

  async searchMany(query: string, page: number) {
    const brands = await prisma.marca.findMany({
      where: {
        nome_marca: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return brands
  }

  async create(data: Prisma.MarcaCreateInput) {
    const brand = await prisma.marca.create({
      data,
    })

    return brand
  }

  async delete(id: string) {
    const brand = await prisma.marca.delete({
      where: {
        id,
      },
    })

    return brand
  }

  async save(brandId: string, nome_marca: string) {
    const saveBrand = await prisma.marca.update({
      where: {
        id: brandId,
      },
      data: {
        nome_marca,
      },
    })

    return saveBrand
  }
}
