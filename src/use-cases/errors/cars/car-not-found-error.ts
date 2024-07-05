export class CarNotFoundError extends Error {
  constructor() {
    super('Carro não encontrado!')
  }
}
