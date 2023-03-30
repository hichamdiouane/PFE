const mangoose = require('mongoose')

const FuelShema = new mangoose.Schema({
    type : {
        type: String,
    },
    prix: {
        type: Number,
    },
})

const FuelModel = new mangoose.model('Fuels',FuelShema)
module.exports = FuelModel