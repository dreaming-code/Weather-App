let butt = document.getElementById("but");
        let op = document.querySelector(".cn");
        let mess = document.querySelector(".mes1");
        let mes1 = document.querySelector(".text1");
        let mes2 = document.querySelector(".text2");
        let city_name = document.getElementById("cityname");
        let image = document.getElementById("image1");
        let apikey = "3feaa1974fb9070eed39177c49a5b2e7";

        // Function to fetch and display weather data
        async function weatherfunc(city) {
            const clickSound = new Audio("click-sound.mp3"); // Replace with your audio file path
            clickSound.volume = 1.0;  // Ensure the volume is set to maximum (0.0 to 1.0 range)
            clickSound.play();
            try {
                let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
                let response = await fetch(apiurl);
                
                if (!response.ok) {
                    throw new Error("City not found");
                }

                let weath = await response.json();
                
                mess.innerHTML = `${(weath.main.temp - 273.15).toFixed(2)}°C`;
                mes1.innerHTML = `${(weath.main.humidity)}%`;
                mes2.innerHTML = `${(weath.wind.speed*3.6).toFixed(2)}km/h`;
                if(weath.weather[0].main=="Clouds")
                {
                    image.src="clouds.png";
                }
                else if(weath.weather[0].main=="Clear")
                    {
                        image.src="clear.png";
                    }
                    else if(weath.weather[0].main=="Rain")
                        {
                            image.src="rain.png";
                        }
                        else if(weath.weather[0].main=="Snow")
                            {
                                image.src="snow.png";
                            }       
                            else if(weath.weather[0].main=="Mist")
                                {
                                    image.src="mist.png";
                                } 
                                else if(weath.weather[0].main=="Drizzle")
                                    {
                                        image.src="drizzle.png";
                                    }
                                else{
                                    image.src="haze.png";
                                    image.style.marginBottom="10px";
                                }
            } catch (error) {
                mess.innerHTML = `Error: ${error.message}`;
            }
        }

        // On page load, restore city and fetch weather
        window.addEventListener("load", () => {
            const savedCity = localStorage.getItem("city");
            if (savedCity) {
               
                weatherfunc(savedCity); // Fetch weather
                op.innerText = savedCity; // Update display
            }
        });

        // On button click, update the display and save the input
        butt.addEventListener("click", () => {
            let city = city_name.value.trim(); // Get the input value
            if (city) {
                localStorage.setItem("city", city); // Save the value
            } else {
                mess.innerHTML = "Please enter a valid city name.";
            }
        });