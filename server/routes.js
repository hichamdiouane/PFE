const express = require('express')

const {ReadCar, CreateCar, DeleteCar, FindCarByMatricule} = require('./controllers/Cars')
const {ReadTrip, CreateTrip} = require('./controllers/Trips')
const {ReadEsence,ReadGazoil} = require('./controllers/Fuels')

// Car
const CarRoute = express.Router()
CarRoute.get('/cars',ReadCar)
CarRoute.post('/createCar',CreateCar)
CarRoute.post('/deleteCar/:matricule',DeleteCar)
CarRoute.post('/getCarByMatricule',FindCarByMatricule)

// Trip
const TripRoute = express.Router()
TripRoute.get('/trips',ReadTrip)
TripRoute.post('/createTrip',CreateTrip)

// Fuel
const FuelRoute = express.Router()
FuelRoute.get('/esence',ReadEsence)
FuelRoute.get('/gazoil',ReadGazoil)

module.exports = { CarRoute, TripRoute, FuelRoute }