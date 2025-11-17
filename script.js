    let mainBox = document.querySelector(".mainBox");
    let inputSection = document.querySelector(".inputSection");
    let input = document.querySelector(".input");
    let btn = document.querySelector(".btn");
    let infoPlace = document.querySelector(".infoPlace");
    let townName = document.querySelector(".townName");
    let disc = document.querySelector(".disc");
    let errorMessage = document.querySelector(".error-message");
    let cels = document.querySelector(".cels");
    let weatherVideo = document.getElementById('weather-video');

    let key = "328e4dda67cbc069d8599681d0392976";


    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            btn.click();
        }
    });


    btn.addEventListener("click", () => {
        if (input.value.trim() === '') {
            console.log("input place is empty");
            infoPlace.style.display = "none";
            errorMessage.style.display = "none";
            weatherVideo.style.display = "none";

        } else {
            getWeather()
        }
    })

    input.addEventListener('input', () => {
        errorMessage.style.display = 'none';
    });


    async function weather() {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=metric`;
            let resp = await fetch(url);
            let data = await resp.json();
            return data;
        } catch (error) {
            console.log('error')
        }
    }


    async function getWeather() {
        try {
            let res = await weather();
            if (!res || res.cod !== 200) {
                throw new Error("City not found");
            }

            infoPlace.style.display = "flex";
            errorMessage.style.display = "none";

            townName.textContent = res.name;
            disc.textContent = res.weather[0].description;
            cels.textContent = `${res.main.temp}°C`;

            input.value = "";

            let weatherMain = res.weather[0].main;
            let videoSrc = "";
            let className = "infoPlace defaultWeather";

            switch (weatherMain) {
                case "Clouds":
                    className = "infoPlace ";
                    videoSrc = "public/cloud.mp4";
                    break;
                case "Rain":
                    className = "infoPlace ";
                    videoSrc = "public/rainy.mp4";
                    break;
                case "Clear":
                    className = "infoPlace ";
                    videoSrc = "public/clear.mp4";
                    break;
                case "Snow":
                    className = "infoPlace ";
                    videoSrc = "public/snow.mp4";
                    break;
                case "Thunderstorm":
                    className = "infoPlace ";
                    videoSrc = "public/thunderstorm.mp4";
                    break;
                default:
                    className = "infoPlace defaultWeather";
                    break;
            }

            infoPlace.className = className;

            if (videoSrc) {
                weatherVideo.style.display = "block";

                let source = weatherVideo.querySelector("source");
                source.src = videoSrc;
                weatherVideo.load();
                weatherVideo.play().catch(() => {
                    console.log("Autoplay blocked on mobile");
                });
            } else {
                weatherVideo.style.display = "none";
            }


        } catch (error) {
            infoPlace.style.display = "none";
            errorMessage.style.display = "block";
            weatherVideo.style.display = "none";
        }
    }