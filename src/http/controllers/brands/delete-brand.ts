import { PrismaBrandsRepository } from '@/repositories/Prisma/prisma-brands-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { DeleteBrandUseCase } from '@/use-cases/brands/delete-brand'

export async function deleteBrand(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteBrandsQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = deleteBrandsQuerySchema.parse(request.query)

  const prismaBrandsRepository = new PrismaBrandsRepository()
  const deleteBrandsUsecase = new DeleteBrandUseCase(prismaBrandsRepository)

  const brands = await deleteBrandsUsecase.delete({
    id,
  })

  return reply.status(204).send()
}
