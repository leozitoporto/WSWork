export class CarAlredyExistsError extends Error {
  constructor() {
    super('Carro já existente!')
  }
}
