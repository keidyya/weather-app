const container = document.querySelector('.container');
const search = document.querySelector('.searchbox button');
const weather = document.querySelector('.weather');
const weatherDets = document.querySelector('.weather-details');
const errors = document.querySelector('.notfound');

search.addEventListener('click', () => {

    const APIKey = '921dc0fb916d7bf7d81482964683367d'; 
    const city = document.querySelector('.searchbox input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then
    (
        json => {
            if (json.cod == '404'){
                container.style.height = '400px';
                weather.style.display = 'none';
                weatherDets.style.display = 'none';
                errors.style.display = 'block';
                errors.classList.add('fadeIn');
                return;
            }

            errors.style.display = 'none';
            errors.classList.remove('fadeIn');
            
            const image = document.querySelector('.weather img');
            const temperature = document.querySelector('.weather .temperature');
            const description = document.querySelector('.weather .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch(json.weather[0].main){
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Clouds':
                    image.src = 'cloud.png';
                    break;
                case 'Haze':
                    image.src = 'mist.png';
                    break;  
                default:
                    image.src = '';      
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weather.style.display = '';
            weatherDets.style.display = '';
            weather.classList.add('fadeIn');
            weatherDets.classList.add('fadeIn');
            container.style.height = '590px';


        });

});