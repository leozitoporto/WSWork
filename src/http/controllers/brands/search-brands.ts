import { PrismaBrandsRepository } from '@/repositories/Prisma/prisma-brands-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { SearchBrandUseCase } from '@/use-cases/brands/search-brands'

export async function searchBrand(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchBrandsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchBrandsQuerySchema.parse(request.query)

  const prismaBrandsRepository = new PrismaBrandsRepository()
  const searchBrandsUsecase = new SearchBrandUseCase(prismaBrandsRepository)

  const brands = await searchBrandsUsecase.execute({
    query: q,
    page,
  })

  return reply.status(201).send({ brands })
}
