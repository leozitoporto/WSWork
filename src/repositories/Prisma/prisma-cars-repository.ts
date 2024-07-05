import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CarsRepository } from '../cars-repository'

interface iCar {
  id: string
  timestamp_cadastro: number
  modelo_id: string
  ano: number
  combustivel: string
  num_portas: number
  cor: string
  nome_modelo: string
  valor: string
  modelo: string 
}

export class PrismaCarsRepository implements CarsRepository {
  async findById(id: string) {
    const car = await prisma.carro.findUnique({
      where: {
        id,
      },
    })

    return car
  }

  async searchMany(query: string, page: number) {
    function formatNumber(num: number) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    function flattenCar(car: iCar) {
      return {
        id: car.id,
        timestamp_cadastro: Math.floor(
          new Date(car.timestamp_cadastro).getTime() / 1000
        ), // Converte para timestamp Unix em segundos
        modelo_id: car.modelo_id,
        ano: car.ano,
        combustivel: car.combustivel,
        num_portas: car.num_portas,
        cor: car.cor,
        nome_modelo: car.modelo.nome,
        valor: formatNumber(parseFloat(car.modelo.valor_fipe)),
      }
    }

    const carsSelect = await prisma.carro.findMany({
      select: {
        id: true,
        timestamp_cadastro: true,
        modelo_id: true,
        ano: true,
        combustivel: true,
        num_portas: true,
        cor: true,
        modelo: {
          select: {
            nome: true,
            valor_fipe: true,
          },
        },
      },
      where: {
        id: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    const cars = carsSelect.map((car) => flattenCar(car))

    return cars
  }

  async create(data: Prisma.CarroUncheckedCreateInput) {
    const car = await prisma.carro.create({
      data,
    })

    return car
  }

  async delete(id: string) {
    const brand = await prisma.carro.delete({
      where: {
        id,
      },
    })

    return brand
  }

  async save(
    carId: string,
    modelo_id: string,
    ano: number,
    combustivel: string,
    num_portas: number,
    cor: string
  ) {
    const saveCar = await prisma.carro.update({
      where: {
        id: carId,
      },
      data: {
        modelo_id,
        ano,
        combustivel,
        num_portas,
        cor,
      },
    })

    return saveCar
  }
}
