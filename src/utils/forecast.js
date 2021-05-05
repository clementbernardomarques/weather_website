const request = require("request")

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=6dd3ba07ef40adfea64c53c5a48d08a0&query=" + encodeURIComponent(longitude) + "," + encodeURIComponent(latitude) + "&units=m"

    request({ url, json: true }, (error, { body }) => {
        if (error){
            // console.log("Unable to connect to weather service.")
            callback("Unable to connect to weather service.", undefined)
        } else if (body.error) {
            // console.log("Unable to find location")
            callback("Unable to find location", undefined)
        } else {
            //console.log(response.body.current)
            //console.log(response.body.current.weather_descriptions[0] + ". It is " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees.")
            callback(undefined, body.current.weather_descriptions[0] + ". It is " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees.")
        }
})
}

module.exports = forecast