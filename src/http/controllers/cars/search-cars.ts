import { PrismaCarsRepository } from '@/repositories/Prisma/prisma-cars-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { SearchCarUseCase } from '@/use-cases/cars/search-cars'

export async function searchCar(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchCarsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchCarsQuerySchema.parse(request.query)

  const prismaCarsRepository = new PrismaCarsRepository()
  const searchCarsUsecase = new SearchCarUseCase(prismaCarsRepository)

  const cars = await searchCarsUsecase.execute({
    query: q,
    page,
  })

  return reply.status(201).send({ cars })
}
