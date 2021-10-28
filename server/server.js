const express = require("express")
const cors = require("cors")
const app = express()
const axios = require("axios")
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const port = process.env.port || 8000

const API_KEY = app.listen(port, () => {
	console.log(`running on port ${port}`)
})

app.get("/", (req, res) => {
	res.send("hello there")
})

app.post("/weather", async (req, res) => {
	const city = req.body.cityName
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`

	try {
		const weather = await axios(url)
		res.json({
			status: "success",
			data: weather.data,
			message: "succesful request",
		})
	} catch (error) {
		res.json({
			status: "failed",
			message: "failed to get data",
		})
	}
})
