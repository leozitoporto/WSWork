import { PrismaCarsRepository } from '@/repositories/Prisma/prisma-cars-repository'
import { CarNotFoundError } from '@/use-cases/errors/cars/car-not-found-error'
import { UpdateCarUseCase } from '@/use-cases/cars/update-car'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function updateCar(request: FastifyRequest, reply: FastifyReply) {
  const updateQuerySchema = z.object({
    carId: z.string(),
  })
  const updateBodySchema = z.object({
    modelo_id: z.string(),
    ano: z.number(),
    combustivel: z.string(),
    num_portas: z.number(),
    cor: z.string(),
  })

  const data = [{}]

  const { carId } = updateQuerySchema.parse(request.query)
  const { modelo_id, ano, combustivel, num_portas, cor } =
    updateBodySchema.parse(request.body)

  try {
    const prismaCarsRepository = new PrismaCarsRepository()
    const updateCarUseCase = new UpdateCarUseCase(prismaCarsRepository)

    await updateCarUseCase.execute({
      carId,
      modelo_id,
      ano,
      combustivel,
      num_portas,
      cor,
    })
  } catch (err) {
    if (err instanceof CarNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
