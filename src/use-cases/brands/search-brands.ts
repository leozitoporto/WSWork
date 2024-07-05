import { BrandsRepository } from '@/repositories/brands-repository'
import { Marca } from '@prisma/client'

interface SearchBrandsUseCaseRequest {
  query: string
  page: number
}

interface SearchBrandsUseCaseResponse {
  brands: Marca[]
}

export class SearchBrandUseCase {
  constructor(private brandsRepository: BrandsRepository) {}

  async execute({ query, page }: SearchBrandsUseCaseRequest) {
    const brands = await this.brandsRepository.searchMany(query, page)

    return {
      brands,
    }
  }
}
