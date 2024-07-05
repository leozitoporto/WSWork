import { BrandsRepository } from '@/repositories/brands-repository'
import { Marca } from '@prisma/client'
import { BrandNotFoundError } from '../errors/brands/brand-not-found-error'

interface UpdateBrandUseCaseRequest {
  brandId: string
  nome_marca: string
}

interface UpdateBrandUseCaseResponse {
  brand: Marca
}

export class UpdateBrandUseCase {
  constructor(private brandsRepository: BrandsRepository) {}

  async execute({
    brandId,
    nome_marca,
  }: UpdateBrandUseCaseRequest): Promise<UpdateBrandUseCaseResponse> {
    const brand = await this.brandsRepository.findById(brandId)

    if (!brand) {
      throw new BrandNotFoundError()
    }

    await this.brandsRepository.save(brandId, nome_marca)

    // const brand = await this.brandsRepository.update({
    //   data: {
    //     nome_marca: 'Alicia',
    //   },
    //   where: {
    //     id,
    //   },
    // })

    return { brand }
    //await this.brandsRepository.create({ nome_marca })
  }
}
