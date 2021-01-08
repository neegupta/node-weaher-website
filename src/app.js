const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//This is to register partials like header and footer.
hbs.registerPartials(partialsPath);

//Setup for handle bars hbs  ***
//Set templating engine
app.set('view engine', 'hbs');
//We dont need this if all views folder name is views and located directly uder root of the project.
app.set('views', viewsPath);

//****

app.use(express.static(publicDirPath));

// This route will be loaded if index.html is not there in public folder.
app.get('', (req, res) => {
    // This will look into views folder and load index.hbs as we have setup view engine as hbs
    res.render("index", {
        title: "Weather app",
        name: "Neeraj Gupta"
    });
});

//No need for static pages routing as configured with app.use(express.static(publicDirPath));. This can be used if we want to deliver static content in form of html

app.get('/help', (req, res) => {

    res.render("help", {
        title: "This is help page",
        helpText: "This is help message",
        name: "Neeraj Gupta"
    });
});

app.get('/about', (req, res) => {

    res.render("about", {
        name: "Neeraj Gupta",
        title: "About me",
        name: "Neeraj Gupta"
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "Kindly provide address"
        })

    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address

            });

        })
    })

});


app.get('/help/*', (req, res) => {

    res.render("404", {
        title: "404",
        name: "Neeraj Gupta",
        errorMessage: "Help Article not found"
    });

});

app.get('*', (req, res) => {

    res.render("404", {
        title: "404",
        name: "Neeraj Gupta",
        errorMessage: "Page not found"
    });

});
app.listen(3000, () => {

    console.log("Server started");
});