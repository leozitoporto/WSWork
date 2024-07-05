import { CarsRepository } from '@/repositories/cars-repository'
import { Carro } from '@prisma/client'

interface SearchCarsUseCaseRequest {
  query: string
  page: number
}

interface SearchCarsUseCaseResponse {
  brands: Carro[]
}

export class SearchCarUseCase {
  constructor(private carsRepository: CarsRepository) {}

  async execute({ query, page }: SearchCarsUseCaseRequest) {
    const cars = await this.carsRepository.searchMany(query, page)

    return {
      cars,
    }
  }
}
