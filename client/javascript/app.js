document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault()
  const city = document.getElementById('city').value
  // POST: http://localhost:3000/get-weather ==> body { city: 'cairo' }
  // update UI
  try {
    const URL = 'http://localhost:3000/get-weather'
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
  // update new entry values
  document.getElementById('feelings-data').innerHTML = `${feelings}`
  document.getElementById('country').innerHTML = `${data.country}`
  document.getElementById('weather-desc').innerHTML = `${data.weather[0].description}`
  document.getElementById('country').innerHTML = `${data.sys.country}`
  document.getElementById('wind-speed').innerHTML = `${data.wind.speed}`
  document.getElementById('longitude').innerHTML = `${data.coord.lon}`
  document.getElementById('latitude').innerHTML = `${data.coord.lat}`
}
