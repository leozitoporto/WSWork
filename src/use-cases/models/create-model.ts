import { ModelsRepository } from '@/repositories/models-repository'
import { ModelAlredyExistsError } from '../errors/models/model-already-exists-error'

interface CreateModelUseCaseRequest {
  marca_id: string
  nome: string
  valor_fipe: number
}

export class CreateModelUseCase {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({ marca_id, nome, valor_fipe }: CreateModelUseCaseRequest) {
    const modelExists = await this.modelsRepository.findByModel(nome)

    if (modelExists) {
      throw new ModelAlredyExistsError()
    }

    await this.modelsRepository.create({ marca_id, nome, valor_fipe })
  }
}
