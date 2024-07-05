import { ModelsRepository } from '@/repositories/models-repository'
import { Modelo } from '@prisma/client'

interface DeleteModelsUseCaseRequest {
  id: string
}

export class DeleteModelUseCase {
  constructor(private modelsRepository: ModelsRepository) {}

  async delete({ id }: DeleteModelsUseCaseRequest) {
    const models = await this.modelsRepository.delete(id)

    return {
      models,
    }
  }
}
