const router = require('express').Router()

const { User } = require('../models')

/**********************Middlewares**********************/

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id)
  next()
}


/**********************GET-Requests**********************/

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.get('/:id', userFinder, async (req, res) => {
  const user = req.user
  if(user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})


/**********************POST-Requests**********************/

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.json(user)
  } catch(e) {
    return res.status(400).json({ error })
  }
})


/**********************DELETE-Requests**********************/

router.delete('/:id', userFinder, async (req, res) => {
  try {
    const username = req.user.username
    req.user.destroy()
    return res.json(`User ${username} was deleted from the server`)
  } catch(e) {
    return res.status(400).json({ error })
  }
})

module.exports = router