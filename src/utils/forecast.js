const apiKey = "3defffb2d48b9ef2eea25dc3c4c28c3f";
const uri = "http://api.weatherstack.com/current"

const axios = require('axios');

const forecast = (latitude, longitude, callback) => {

    axios({
        method: 'get',
        url: uri,
        responseType: 'json',
        params: {
            access_key: apiKey,
            query: latitude + ',' + longitude

        } // ES6 object destructuring 
    }).then(({data} = {}) => {
        // console.log(response);
        if (data.success != undefined && !data.success) {
            callback('Unable to find location', undefined)
        }
        else {
            const currentTemp = data.current.temperature;
            const feelslike = data.current.feelslike;
            callback(undefined, "Its currently " + currentTemp + " but it feels like " + feelslike);
        }
    }).catch((error) => {
        callback('Unable to connect to weather service!', undefined)
    });


}

module.exports = forecast