let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
let apiKey = "&appid=80deacc14d9592c6f37b185be2dee439";
let unit = "&units=metric";

let searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', async()=>{
    let searchField = document.querySelector('input');
    let region = searchField.value;
    if(region != ""){
        getWeather(region);
    }
})

document.addEventListener("keypress",async(event)=>{
    let searchField = document.querySelector('input');
    let region = searchField.value;
    if(event.code == "Enter" && region != '') {
        getWeather(region);
    }
})

async function getWeather(city){
    let result = await fetch(apiUrl + city + apiKey + unit);
    result = await result.json();
    // console.log(result);
    if(result.cod == '404') {
        document.querySelector('#weather').classList.add('hidden');
        console.log("Invalid City");
        document.querySelector('#notFound').classList.remove('hidden');
    }
    else{
        document.querySelector('#notFound').classList.add('hidden');
        document.querySelector('.city').innerText = result.name;
        document.querySelector('.temp').innerText = Math.round(result.main.temp) + '°C';
        document.querySelector('.feel').innerText = "Feels like " + Math.round(result.main.feels_like) + '°C';
        document.querySelector('.wind').innerText = Math.round(result.wind.speed) + " km/h";
        document.querySelector('.humidity').innerText = result.main.humidity + "%";
        let weatherStatus = document.querySelector('.weatherStatus');
        if(result.weather[0].main == 'Mist') {
            document.querySelector('.weatherImage').src = "images/mist.png"
            weatherStatus.innerText = "Mist";
        }
        if(result.weather[0].main == 'Clear') {
            weatherStatus.innerText = "Clear";
            document.querySelector('.weatherImage').src = "images/clear.png";
        }
        if(result.weather[0].main == "Clouds"){
            weatherStatus.innerText = 'Clouds';
            document.querySelector('.weatherImage').src = "images/clouds.png"
        }
        if(result.weather[0].main == 'Rain'){
            weatherStatus.innerText = 'Rain';
            document.querySelector('.weatherImage').src = "images/rain.png"
        }
        if(result.weather[0].main == 'Drizzle') {
            weatherStatus.innerText = 'Drizzle';
            document.querySelector('.weatherImage').src = "images/drizzle.png"
        }
        if(result.weather[0].main == 'Snow'){
            weatherStatus.innerText = 'Snow';
            document.querySelector('.weatherImage').src = "images/snow.png";
        }
        document.querySelector('#weather').classList.remove('hidden');
    }
}