import { CarsRepository } from '@/repositories/cars-repository'
import { CarAlredyExistsError } from '../errors/cars/car-already-exists-error'

interface CreateCarUseCaseRequest {
  modelo_id: string
  ano: number
  combustivel: string
  num_portas: number
  cor: string
}

export class CreateCarUseCase {
  constructor(private carsRepository: CarsRepository) {}

  async execute({
    modelo_id,
    ano,
    combustivel,
    num_portas,
    cor,
  }: CreateCarUseCaseRequest) {
    await this.carsRepository.create({
      modelo_id,
      ano,
      combustivel,
      num_portas,
      cor,
    })
  }
}
