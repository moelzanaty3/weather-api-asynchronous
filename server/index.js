const express = require('express')
const morgan = require('morgan')
const axios = require('axios')
const cors = require('cors')

require('dotenv').config()

// start up an instance of the app
const app = express()

// middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.get('/', (req, res) => {
  // run when the route called
  res.json({
    message: '🌍 Hi, I am a live',
  })
})

app.post('/get-weather', async (req, res) => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${process.env.API_KEY}`
  try {
    const response = await axios(URL)
    res.json({
      status: 'success',
      data: response.data,
      message: 'Date Retrieved Successfully',
    })
    return
  } catch (error) {
    console.log(error.message)
    res.json({
      status: 'error',
      message: 'Error: may city not found',
    })
  }
})

const PORT = process.env.port || 4000

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
