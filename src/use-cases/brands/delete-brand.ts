import { BrandsRepository } from '@/repositories/brands-repository'
import { Marca } from '@prisma/client'

interface DeleteBrandsUseCaseRequest {
  id: string
}

export class DeleteBrandUseCase {
  constructor(private brandsRepository: BrandsRepository) {}

  async delete({ id }: DeleteBrandsUseCaseRequest) {
    const brands = await this.brandsRepository.delete(id)

    return {
      brands,
    }
  }
}
