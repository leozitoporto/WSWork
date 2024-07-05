import { CarsRepository } from '@/repositories/cars-repository'
import { Carro } from '@prisma/client'
import { CarNotFoundError } from '../errors/cars/car-not-found-error'

interface UpdateCarUseCaseRequest {
  carId: string
  modelo_id: string
  ano: number
  combustivel: string
  num_portas: number
  cor: string
}

interface UpdateCarUseCaseResponse {
  car: Carro
}

export class UpdateCarUseCase {
  constructor(private carsRepository: CarsRepository) {}

  async execute({
    carId,
    modelo_id,
    ano,
    combustivel,
    num_portas,
    cor,
  }: UpdateCarUseCaseRequest): Promise<UpdateCarUseCaseResponse> {
    const car = await this.carsRepository.findById(carId)

    if (!car) {
      throw new CarNotFoundError()
    }

    await this.carsRepository.save(
      carId,
      modelo_id,
      ano,
      combustivel,
      num_portas,
      cor
    )

    return { car }
  }
}
