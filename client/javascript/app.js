document.getElementById("form").addEventListener("submit", async e => {
	e.preventDefault()
	const cityName = document.getElementById("city").value
	!cityName ? alert("please enter city name") : null
	try {
		const url = "http://localhost:8000/weather"
		const weatherData = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ cityName }),
		})
		const data = await weatherData.json()
		updateUi(data.data)
	} catch (error) {
		console.log(error.message)
	}
})

const updateUi = data => {
	const feelsLike = document.getElementById("feelings").value
	document.getElementById("feelings-data").innerHTML = `${feelsLike}`
	document.getElementById("country").innerHTML = `${data.sys.country}`
	document.getElementById("weather-desc").innerHTML =
		data.weather[0].description

	document.getElementById("wind-speed").innerHTML = `${data.wind.speed}`
	document.getElementById("longitude").innerHTML = `${data.coord.lon}`
	document.getElementById("latitude").innerHTML = `${data.coord.lat}`
}
