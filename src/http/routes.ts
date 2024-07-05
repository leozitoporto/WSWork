import { FastifyInstance } from 'fastify'

import { createBrand } from './controllers/brands/create-brand'
import { searchBrand } from './controllers/brands/search-brands'
import { deleteBrand } from './controllers/brands/delete-brand'
import { updateBrand } from './controllers/brands/update-brand'

import { createModel } from './controllers/models/create-model'
import { deleteModel } from './controllers/models/delete-model'
import { searchModel } from './controllers/models/search-models'
import { updateModel } from './controllers/models/update-model'

import { createCar } from './controllers/cars/create-car'
import { deleteCar } from './controllers/cars/delete-car'
import { searchCar } from './controllers/cars/search-cars'
import { updateCar } from './controllers/cars/update-car'

export async function appRoutes(app: FastifyInstance) {
  //BRANDS
  app.post('/create-brand', createBrand)
  app.get('/search-brand', searchBrand)
  app.get('/delete-brand', deleteBrand)
  app.put('/save-brand', updateBrand)

  //MODELS
  app.post('/create-model', createModel)
  app.get('/search-model', searchModel)
  app.get('/delete-model', deleteModel)
  app.put('/save-model', updateModel)

  //CARS
  app.post('/create-car', createCar)
  app.get('/search-car', searchCar)
  app.get('/delete-car', deleteCar)
  app.put('/save-car', updateCar)
}
