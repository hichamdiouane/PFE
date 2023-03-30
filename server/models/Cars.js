const mangoose = require('mongoose')

const CarShema = new mangoose.Schema({
    matricule : {
        type: String,
    },
    marque: {
        type: String,
    },
    modele: {
        type: Number,
    },
    la_date_de_lassurance: {
        type: String,
    },
    la_duree_de_lassurance: {
        type: Number,
    },
    type_de_carburent: {
        type: String,
    },
    la_capacite_du_reservoir: {
        type: Number,
    },
    la_date_de_visite: {
        type: String,
    },
})

const CarModel = new mangoose.model('Cars',CarShema)
module.exports = CarModel