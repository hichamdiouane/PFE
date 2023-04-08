const mangoose = require('mongoose')

const UserShema = new mangoose.Schema({
    role : {
        type: String,
    },
    nom: {
        type: String,
    },
    prenom: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    tel: {
        type: Number,
    },
    pays: {
        type: String,
    },
    ville: {
        type: String,
    },
})

const UserModel = new mangoose.model('Users',UserShema)
module.exports = UserModel