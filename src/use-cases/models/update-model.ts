import { ModelsRepository } from '@/repositories/models-repository'
import { Modelo } from '@prisma/client'
import { ModelNotFoundError } from '../errors/models/model-not-found-error'
import { Decimal } from '@prisma/client/runtime/library'

interface UpdateModelUseCaseRequest {
  modelId: string
  marca_id: string
  nome: string
  valor_fipe: number
}

interface UpdateModelUseCaseResponse {
  model: Modelo
}

export class UpdateModelUseCase {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({
    modelId,
    marca_id,
    nome,
    valor_fipe,
  }: UpdateModelUseCaseRequest): Promise<UpdateModelUseCaseResponse> {
    const model = await this.modelsRepository.findById(modelId)

    if (!model) {
      throw new ModelNotFoundError()
    }

    await this.modelsRepository.save(modelId, marca_id, nome, valor_fipe)

    return { model }
  }
}
