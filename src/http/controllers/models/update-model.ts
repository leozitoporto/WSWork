import { PrismaModelsRepository } from '@/repositories/Prisma/prisma-models-repository'
import { ModelNotFoundError } from '@/use-cases/errors/models/model-not-found-error'
import { UpdateModelUseCase } from '@/use-cases/models/update-model'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function updateModel(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateQuerySchema = z.object({
    modelId: z.string(),
  })
  const updateBodySchema = z.object({
    marca_id: z.string(),
    nome: z.string(),
    valor_fipe: z.number(),
  })

  const data = [{}]

  const { modelId } = updateQuerySchema.parse(request.query)
  const { marca_id, nome, valor_fipe } = updateBodySchema.parse(request.body)

  try {
    const prismaModelsRepository = new PrismaModelsRepository()
    const updateModelUseCase = new UpdateModelUseCase(prismaModelsRepository)

    await updateModelUseCase.execute({
      modelId,
      marca_id,
      nome,
      valor_fipe,
    })
  } catch (err) {
    if (err instanceof ModelNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
