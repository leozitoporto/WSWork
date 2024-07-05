import { PrismaBrandsRepository } from '@/repositories/Prisma/prisma-brands-repository'
import { BrandAlredyExistsError } from '@/use-cases/errors/brands/brand-already-exists-error'
import { CreateBrandUseCase } from '@/use-cases/brands/create-brand'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createBrand(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createBodySchema = z.object({
    nome_marca: z.string(),
  })

  const { nome_marca } = createBodySchema.parse(request.body)

  try {
    const prismaBrandsRepository = new PrismaBrandsRepository()
    const createBrandUseCase = new CreateBrandUseCase(prismaBrandsRepository)

    await createBrandUseCase.execute({
      nome_marca,
    })
  } catch (err) {
    if (err instanceof BrandAlredyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
