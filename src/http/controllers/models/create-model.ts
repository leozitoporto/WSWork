import { PrismaModelsRepository } from '@/repositories/Prisma/prisma-models-repository'
import { ModelAlredyExistsError } from '@/use-cases/errors/models/model-already-exists-error'
import { CreateModelUseCase } from '@/use-cases/models/create-model'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createModel(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createBodySchema = z.object({
    marca_id: z.string(),
    nome: z.string(),
    valor_fipe: z.number(),
  })

  const { marca_id, nome, valor_fipe } = createBodySchema.parse(request.body)

  try {
    const prismaModelsRepository = new PrismaModelsRepository()
    const createModelUseCase = new CreateModelUseCase(prismaModelsRepository)

    await createModelUseCase.execute({
      marca_id, nome, valor_fipe,
    })
  } catch (err) {
    if (err instanceof ModelAlredyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
