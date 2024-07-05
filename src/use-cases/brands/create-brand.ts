import { BrandsRepository } from '@/repositories/brands-repository'
import { BrandAlredyExistsError } from '../errors/brands/brand-already-exists-error'

interface CreateBrandUseCaseRequest {
  nome_marca: string
}

export class CreateBrandUseCase {
  constructor(private brandsRepository: BrandsRepository) {}

  async execute({ nome_marca }: CreateBrandUseCaseRequest) {
    const brandExists = await this.brandsRepository.findByBrand(nome_marca)

    if (brandExists) {
      throw new BrandAlredyExistsError()
    }

    await this.brandsRepository.create({ nome_marca })
  }
}
