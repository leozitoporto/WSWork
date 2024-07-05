import { ModelsRepository } from '@/repositories/models-repository'
import { Modelo } from '@prisma/client'

interface SearchModelsUseCaseRequest {
  query: string
  page: number
}

interface SearchModelsUseCaseResponse {
  brands: Modelo[]
}

export class SearchModelUseCase {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({ query, page }: SearchModelsUseCaseRequest) {
    const models = await this.modelsRepository.searchMany(query, page)

    return {
      models,
    }
  }
}
