const path = require("path")
const express = require('express')
const hbs = require('hbs')

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

// Define paths for Express config
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Clemsou Bernardo"
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Clemsou Bernardo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Clemsou Bernardo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: "Please provide an adress!"
        })
    }

    const localisation = req.query.adress;

    geocode(localisation, (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error })
          }
      
          res.send({
              adress: localisation,
              latitude: latitude,
              longitude: longitude,
              location: location,
              forecast: forecastData
          })
        })
      
      })
    })

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Clemsou Bernardo',
        message: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Clemsou Bernardo',
        message: "Page not found"
    })
})
app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})