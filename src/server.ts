import { app } from './app'
import { env } from './env'

app.listen(
  {
    host: '0.0.0.0',
    port: env.PORT,
  },
  function (error, adress) {
    if (error) {
      console.log(error)
      process.exit(1)
    }
    console.log('🚀 HTTP Server Runnig in ' + adress)
    //console.log(env)
  }
)
