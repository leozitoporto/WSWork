export class ModelAlredyExistsError extends Error {
  constructor() {
    super('Modelo já existente!')
  }
}
