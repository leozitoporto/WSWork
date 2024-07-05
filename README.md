# API Teste WSWORK com NodeJS e Typescript + Docker

## Docker Compose

Execute o comando abaixo (no diretório raiz do projeto):

```bash

docker-compose up

```

## Para testar as rotas, segue um arquivo como exemplo na pasta raíz do projeto com o nome de "Collection_frete_rapido.json"

```bash

#POSTGRES
IMAGE_POSTGRES="postgres"
DATABASE_POSTGRES="challenge"
USER_POSTGRES="postgres"
PASSWORD_POSTGRES="awsd123456"
PORT_POSTGRES=5432
HOST_POSTGRES="0.0.0.0"
HOST_POSTGRES_CONTAINER="postgres_api_wswork"
DATABASE_URL="postgresql://postgres:awsd123456@postgres:5432/challenge?schema=challenge"
PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK=false

#APP
NODE_ENV=dev
PORT=3000

```

## Adicionar um arquivo ".env" na raiz do projeto com as seguintes informações:

- Importar "Collection_wswork.json" no Insomnia ou Postman para testes.
- Para testar a rota principal onde devolve o json solicitado utilizar a rota: http://0.0.0.0:3000/search-car?q=&page=1
  onde pode ser passado como parâmetro o id do carro ou sem parâmetro para listar todos.

## Lista de bibliotecas utilizadas

```yaml
  "devDependencies": {
    "@types/node": "^20.10.5",
    "dotenv": "^16.3.1",
    "prisma": "^5.15.1",
    "tsup": "^8.0.1",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  },
  "dependencies": {
    "@prisma/client": "^5.15.1",
    "fastify": "^4.25.2",
    "zod": "^3.22.4"
  }
```
