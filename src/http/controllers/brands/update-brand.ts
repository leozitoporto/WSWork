import { PrismaBrandsRepository } from '@/repositories/Prisma/prisma-brands-repository'
import { BrandNotFoundError } from '@/use-cases/errors/brands/brand-not-found-error'
import { UpdateBrandUseCase } from '@/use-cases/brands/update-brand'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function updateBrand(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateQuerySchema = z.object({
    brandId: z.string(),
  })
  const updateBodySchema = z.object({
    nome_marca: z.string(),
  })

  const data = [{}]

  const { brandId } = updateQuerySchema.parse(request.query)
  const { nome_marca } = updateBodySchema.parse(request.body)

  try {
    const prismaBrandsRepository = new PrismaBrandsRepository()
    const updateBrandUseCase = new UpdateBrandUseCase(prismaBrandsRepository)

    await updateBrandUseCase.execute({
      brandId,
      nome_marca,
    })
  } catch (err) {
    if (err instanceof BrandNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
