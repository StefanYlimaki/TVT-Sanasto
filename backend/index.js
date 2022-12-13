
const express = require('express')
const cors = require('cors')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

app.use(cors())

const dataRouter = require('./controllers/data')
const usersRouter = require('./controllers/users')

app.use(express.json())
app.use('/api/data', dataRouter)
app.use('/api/users', usersRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
