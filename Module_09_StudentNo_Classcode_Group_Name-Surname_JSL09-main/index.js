let crypto = document.getElementById('crypto-top');
let weather = document.getElementById('weather');
let time = document.getElementById('time');
let author = document.getElementById('author');


try{

let promise1 = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
let promise2 = await promise1.json();

//console.log(promise2)

 if(!promise1.ok){
    throw Error('Could not fetch data')
 }

document.body.style.backgroundImage = `url(${promise2.urls.regular})`
author.textContent = `by ${promise2.user.name}`

}
catch{
    (err) =>
    { console.error(err)}
}

function getCurrentTime() {
    const date = new Date()
    time.textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}
getCurrentTime();
setInterval(getCurrentTime, 1000);


try{
let promise_crypto1 = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
let promise_crypto2;

if(!promise_crypto1.ok){
   
    throw Error("Something went wrong")
   
}

promise_crypto2 = await promise_crypto1.json();

crypto.innerHTML = `
            <div class='divimgname'>
            <img src=${promise_crypto2.image.small} />
            <span>${promise_crypto2.name}</span> 
            </div> `

            
crypto.innerHTML += `
                        <p>🎯: $${promise_crypto2.market_data.current_price.usd}</p>
                        <p>👆: $${promise_crypto2.market_data.high_24h.usd}</p>
                        <p>👇: $${promise_crypto2.market_data.low_24h.usd}</p>
                    `
}
catch{
    (err) =>{
      console.error(err)
    }
}


navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            weather.innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});