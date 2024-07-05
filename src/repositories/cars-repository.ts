import { Prisma, Carro } from '@prisma/client'

interface iCars {
  id: string
  timestamp_cadastro: number
  modelo_id: string
  ano: number
  combustivel: string
  num_portas: number
  cor: string
  nome_modelo: string
  valor: number
}

export interface CarsRepository {
  findById(id: string): Promise<Carro | null>
  searchMany(query: string, page: number): Promise<iCars[]>
  create(data: Prisma.CarroUncheckedCreateInput): Promise<Carro>
  save(
    carId: string,
    modelo_id: string,
    ano: number,
    combustivel: string,
    num_portas: number,
    cor: string
  ): Promise<Carro>
  delete(id: string): Promise<Carro | null>
}
