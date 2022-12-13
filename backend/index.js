
const express = require('express')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const usersRouter = require('./controllers/users')

app.use(express.json())
app.use('/api/users', usersRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
