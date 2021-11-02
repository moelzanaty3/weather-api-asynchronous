document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault()
  const city = document.getElementById('city').value
  // POST: http://localhost:3000/get-weather ==> body { city: 'cairo' }
  // update UI
  try {
    const URL = 'http://localhost:4000/get-weather'
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city }),
    })
    const data = await response.json()
    toast(data.message)
    updateUI(data.data)
  } catch (error) {
    console.log(error.message)
    toast('Error: may city not clear')
  }
})

function updateUI(data) {
  // get feeling value
  const feelings = document.getElementById('feelings').value
  document.getElementById('content').innerHTML = `
  <div class="card-title">Most Recent Entry</div>
  <div id="card-body">
    <div class="card-text">Feelings: ${feelings}</div>
    <div class="card-text">Country: ${data.sys.country}</div>
    <div class="card-text">Weather Description: ${data.weather[0].description}</div>
    <div class="card-text"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" id="weather-icon" alt="icon"></img></div>
    <div class="card-text">Wind Speed: ${data.wind.speed}</div>
    <div class="card-text">Longitude: ${data.coord.lon}</div>
    <div class="card-text">Latitude: ${data.coord.lat}</div>
  </div>
  `
}
