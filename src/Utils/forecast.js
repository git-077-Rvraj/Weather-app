const request = require('request')

const forecast = (lati, longi, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f0db84e9f715fbc0b3530748d6a3e51c&query=' + lati + ',' + longi + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast




// const url = 'http://api.weatherstack.com/current?access_key=f0db84e9f715fbc0b3530748d6a3e51c&query=42.3605,-71.0596&units=m'

// request({url: url, json: true}, (error,response) => {
//     if(error){
//         console.log('Unable to connect to the weather')
//     }
//     else if(response.body.error){
//         console.log('unalble to find location')
//     }
//     else{
//     console.log(response.body.current.weather_descriptions[0] + " It is currently "+ response.body.current.temperature + " degree out. there is a " + response.body.current.feelslike + " % chance of rain")
//     // console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
//     }
// })