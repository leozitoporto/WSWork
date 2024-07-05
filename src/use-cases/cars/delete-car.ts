import { CarsRepository } from '@/repositories/cars-repository'
import { Carro } from '@prisma/client'

interface DeleteCarsUseCaseRequest {
  id: string
}

export class DeleteCarUseCase {
  constructor(private carsRepository: CarsRepository) {}

  async delete({ id }: DeleteCarsUseCaseRequest) {
    const models = await this.carsRepository.delete(id)

    return {
      models,
    }
  }
}
