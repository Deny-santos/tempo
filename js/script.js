//variaveis e seleção de elementos
const apiKey = "90a53212923b8e26b7ca25a09d241fad"
const apiCountryurl = "https://countryflagsapi.com/png/"
const apiImage = "KC4cV4mZzXFW4pcCdJ7zVvG8V3M0KMYJogbujffSsZs"
const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")
const wrrap = document.querySelector(".wrrap")
const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const windElement = document.querySelector("#wind span")
const humidityElement = document.querySelector("#humidity span")
const dontFind = ` <i class="fa-regular fa-circle-xmark dontfind"></i> `
const value = cityElement.value
const dataTime = document.querySelector("#weather-data")
const message = document.querySelector(".message1")
cityInput.focus()


//funções

const showData = async (data) => {
    if(data.name) {
        dataTime.classList.add("visible")
    } else {
        dataTime.classList.remove("visible")
    }
}

// const showMessage =  (data) => {
//     if(!data.name) {
//         message.classList.remove("hide")
//     }
// }

async function changeBackground () {
    const req = await fetch(`https://api.unsplash.com/search/photos?query=${cityInput.value}&client_id=${apiImage}`)
    const data = await req.json()
    const imageCountry = data.results[0].urls.regular
    wrrap.style.backgroundImage = `url(${imageCountry})`
}

const getWaetherData = async (city) => {

    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherUrl)
    const data = res.json()
    console.log(data)
    return data
}

const showWeather = async (cityy) => {
    const data = await getWaetherData(cityy)
    
    showData(data)
    cityElement.innerHTML = data.name ?? dontFind
    tempElement.innerHTML =  parseInt(data.main.temp)
    descElement.innerHTML =  data.weather[0].description
    weatherIconElement.setAttribute(
        "src", 
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    )
    countryElement.setAttribute("src", apiCountryurl+data.sys.country)
    humidityElement.innerHTML = `${data.main.humidity}%`
    windElement.innerHTML = `${data.wind.speed}km/h`
    changeBackground()
}


//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const city = cityInput.value
    showWeather(city)

})

document.addEventListener( "keypress", (e) => {

    if(e.key == "Enter") {
        const city = cityInput.value
        showWeather(city)

    }
})
