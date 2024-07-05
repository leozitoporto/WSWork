import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ModelsRepository } from '../models-repository'

export class PrismaModelsRepository implements ModelsRepository {
  async findById(id: string) {
    const model = await prisma.modelo.findUnique({
      where: {
        id,
      },
    })

    return model
  }

  async findByModel(nome: string) {
    const model = await prisma.modelo.findFirst({
      where: {
        nome,
      },
    })

    return model
  }

  async searchMany(query: string, page: number) {
    const models = await prisma.modelo.findMany({
      where: {
        nome: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return models
  }

  async create(data: Prisma.ModeloUncheckedCreateInput) {
    const modelo = await prisma.modelo.create({
      data,
    })

    return modelo
  }

  async delete(id: string) {
    const brand = await prisma.modelo.delete({
      where: {
        id,
      },
    })

    return brand
  }

  async save(
    modelId: string,
    marca_id: string,
    nome: string,
    valor_fipe: number
  ) {
    const saveModel = await prisma.modelo.update({
      where: {
        id: modelId,
      },
      data: {
        marca_id,
        nome,
        valor_fipe,
      },
    })

    return saveModel
  }
}
