const mangoose = require('mongoose')

const TripShema = new mangoose.Schema({
    matricule : {
        type: String,
    },
    date: {
        type: String,
    },
    distance: {
        type: Number,
    },
    quantite: {
        type: Number,
    },
    consommation: {
        type: Number,
    },
    cout: {
        type: Number,
    },
})

const TripModel = new mangoose.model('Trips',TripShema)
module.exports = TripModel