import { PrismaModelsRepository } from '@/repositories/Prisma/prisma-models-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { SearchModelUseCase } from '@/use-cases/models/search-models'

export async function searchModel(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchModelsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchModelsQuerySchema.parse(request.query)

  const prismaModelsRepository = new PrismaModelsRepository()
  const searchModelsUsecase = new SearchModelUseCase(prismaModelsRepository)

  const models = await searchModelsUsecase.execute({
    query: q,
    page,
  })

  return reply.status(201).send({ models })
}
