import { PrismaCarsRepository } from '@/repositories/Prisma/prisma-cars-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { DeleteCarUseCase } from '@/use-cases/cars/delete-car'

export async function deleteCar(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteCarsQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = deleteCarsQuerySchema.parse(request.query)

  const prismaCarsRepository = new PrismaCarsRepository()
  const deleteCarsUsecase = new DeleteCarUseCase(prismaCarsRepository)

  const models = await deleteCarsUsecase.delete({
    id,
  })

  return reply.status(204).send()
}
