const city = document.getElementById('city')
const region = document.getElementById('region')
const country = document.getElementById('country')
const temperature = document.getElementById('temperature')
const humidity = document.getElementById('humidity')
const condition = document.getElementById('condition')
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

// Event happens after search button is clicked with locations

searchButton.addEventListener('click',async ()=>{
    const value = searchInput.value;
    const response = await searchWeatherByLocation(value);

    const city = response.location.name
    const region = response.location.region
    const country = response.location.country
    const temperature = response.current.temp_f
    const humidity = response.current.humidity
    const condition = response.current.condition.text

    updateDom({city,region,country,temperature,humidity,condition})

})

window.addEventListener('load',()=>{

    // when browser is loaded , it calls the requestLocation function and it returns a promise.

    requestLocation()
    // After successful resolve it gives longtitude and latitude as two parameters
    .then((lat,long)=>getWeatherByLocation(lat,long))
    .then(response=>{
           console.log(response)
           const city = response.location.name
           const region = response.location.region
           const country = response.location.country
           const temperature = response.current.temp_f
           const humidity = response.current.humidity
           const condition = response.current.condition.text

           updateDom({city,region,country,temperature,humidity,condition})
      })
    .catch((error)=>{
       console.log(error);
    })
    }
)


function requestLocation()
{
    return new Promise((resolve,reject)=>{

        //Below code gets the current location and it contains two callbacks one for success fetch location data ,another for not able to fetch the location

        window.navigator.geolocation.getCurrentPosition(({coords})=>{ 
            resolve(coords.latitude,coords.longitude)
        },(error)=>{
            reject("Can't get user location",error)
        })
    })
}

async function  getWeatherByLocation(lat,long){

    const url = `https://api.weatherapi.com/v1/current.json?key=2568755a8ce7406d8e1132858240110&q=${lat},${long}`
    const response = await fetch(url)
    const result = response.json()
    return result

}


async function  searchWeatherByLocation(location)
{
    const url = `https://api.weatherapi.com/v1/current.json?key=2568755a8ce7406d8e1132858240110&q=${location}`
    const response = await fetch(url)
    const result = response.json()
    return result
}
    
function updateDom(data)
{
    city.innerText = data.city
    region.innerText = data.region
    country.innerText = data.country
    temperature.innerText = data.temperature
    humidity.innerText = data.humidity
    condition.innerText = data.condition
}