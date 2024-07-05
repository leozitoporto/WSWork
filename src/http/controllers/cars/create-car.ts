import { PrismaCarsRepository } from '@/repositories/Prisma/prisma-cars-repository'
import { CarAlredyExistsError } from '@/use-cases/errors/cars/car-already-exists-error'
import { CreateCarUseCase } from '@/use-cases/cars/create-car'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createCar(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createBodySchema = z.object({
    modelo_id: z.string(),
    ano: z.number(),
    combustivel: z.string(),
    num_portas: z.number(),
    cor: z.string(),
  })

  const { modelo_id, ano, combustivel, num_portas, cor } = createBodySchema.parse(request.body)

  try {
    const prismaCarsRepository = new PrismaCarsRepository()
    const createModelUseCase = new CreateCarUseCase(prismaCarsRepository)

    await createModelUseCase.execute({
      modelo_id,
      ano,
      combustivel,
      num_portas,
      cor,
    })
  } catch (err) {
    if (err instanceof CarAlredyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
