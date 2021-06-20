const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicnZyYWotMDc3NyIsImEiOiJja3B6ejhmOHYwemprMnZud252Zjg1Y2l1In0.4V2t1c0O_zyAJk0Drgj9cQ&limit=1'
    
    request({url: url, json:true }, (error,response) => {
        if(error){
            callback('Unable to connect to the weather',undefined)
        }
        else if(response.body.features.lenght===0){
            callback('unalble to find location', undefined)
        }
        else{
            callback(undefined,{
                lati: response.body.features[0].center[1],
                longi: response.body.features[0].center[0],
                location: response.body.features[0].text
            })
            
            
        }
    })
}

module.exports = geocode

// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicnZyYWotMDc3NyIsImEiOiJja3B6ejhmOHYwemprMnZud252Zjg1Y2l1In0.4V2t1c0O_zyAJk0Drgj9cQ&limit=1'

// request({url: geocodeUrl, json: true}, (error,response) => {

//     if(error){
//         console.log('Unable to connect to the weather')
//     }
//     else if(response.body.features.lenght===0){
//         console.log('unalble to find location')
//     }
//     else{
//     const longi = response.body.features[0].center[1]
//     const lati = response.body.features[0].center[0]
//     console.log(longi, lati)
//     }
// })