const axios = require('axios');
const access_token = "pk.eyJ1IjoibmVlZ3VwdGEiLCJhIjoiY2tqYnFnYzZnN3BlNTJ2cWpnMXp0ODFpZyJ9.SVNA1Xs7u95l0osP_vb0cw";

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json";
   
    axios({
        method: 'get',
        //ES6 syntax shorthand
        url,
        responseType: 'json',
        params: {
            //ES6 syntax shorthand
            access_token,
            limit: 1
        }
    }).then(({data} = {}) => {
        // console.log(response.data);
        if (data.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            })
        }
    }).catch((error) => {
        console.log(error);
        callback('Unable to connect to location services!', undefined)
    });
}

module.exports = geocode