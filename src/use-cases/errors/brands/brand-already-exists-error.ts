export class BrandAlredyExistsError extends Error {
  constructor() {
    super('Marca já existente!')
  }
}
