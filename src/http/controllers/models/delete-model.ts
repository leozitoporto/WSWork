import { PrismaModelsRepository } from '@/repositories/Prisma/prisma-models-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { DeleteModelUseCase } from '@/use-cases/models/delete-model'

export async function deleteModel(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteModelsQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = deleteModelsQuerySchema.parse(request.query)

  const prismaModelsRepository = new PrismaModelsRepository()
  const deleteModelsUsecase = new DeleteModelUseCase(prismaModelsRepository)

  const models = await deleteModelsUsecase.delete({
    id,
  })

  return reply.status(204).send()
}
