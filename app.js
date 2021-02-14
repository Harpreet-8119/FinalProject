const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('../functions/weather.js');
// express gives you access to the express function which has various methods that help us create and run a web server.
const app = express()
// GET - lets us configure what user receives when they try to get some data from server.
// Routes
const pubPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(pubPath))
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
   res.render('index',{
       title:'Weather App'
   })
})

app.get('/about',(req,res)=>{
   res.render('about')
})

app.get('/weather',(req,res)=>{
    if (!req.query.location) {
        return res.send({
            error:'Location Required'
        })
    }
    weather(req.query.location,(error,data)=>{
        if (error !== undefined) {
            return res.send({
                error
            })
        }else{
          return res.send({
              location:data.location.name,
              temp: data.current.temperature,
              icon:data.current.weather_icons[0],
              desc:data.current.weather_descriptions[0]
          })
        }
    })
})

app.listen(3000,()=>{
    console.log('Server is Up')
})