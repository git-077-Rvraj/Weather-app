const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../Public')
app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', 
    {
        title: 'Weather',
        name: 'Ravi'
    })
}) 

app.get('/about', (req,res)=> {
    res.render('about', {
        title: 'About me',
        name: 'ravi'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You Must Provide an Address'
        })
    }
    // res.send({
    //     forecast: "its raining",
    //     location: "ranchi",
    //     address: req.query.address
    // })
    geocode(req.query.address, (error,{lati,longi,location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(lati,longi,(error,forecastData) => {
            if(error){
                return res.send({error})
            }      
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
   


app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        helptext: 'Need any help?'
    })
})

app.get('*', (req,res)=>
    res.send('404, page not found')
    )


app.listen(3000, () => {
    console.log('server started')
})
