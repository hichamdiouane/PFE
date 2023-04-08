const CarModel = require('../models/Cars')

const ReadCar = async(req,res) => {   
    try {
        const cars = await CarModel.find()
        if (!cars || cars.length === 0) {
            return res.json({ error: "No data" })
        }
        res.send(cars)
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const CreateCar = async(req,res) => {   
    try {
        const newCar = new CarModel(req.body)
        await newCar.save()
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const DeleteCar = async(req,res) => {   
    try {
        const matricule = req.params.matricule;
        const car = await CarModel.findOneAndDelete({matricule: matricule})
        if (!car || car.length === 0) {
            return res.json({ error: "No data" })
        }
        res.status(200).send('car deleted');
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const UpdateCar = async(req,res) => {   
    try {
        const car = await CarModel.findOne({matricule: req.body.matricule1})
        car.matricule = req.body.matricule,
        car.marque = req.body.marque,
        car.modele= req.body.modele,
        car.la_date_de_lassurance = req.body.la_date_de_lassurance, 
        car.la_duree_de_lassurance = req.body.la_duree_de_lassurance,
        car.type_de_carburent = req.body.type_de_carburent,
        car.la_capacite_du_reservoir = req.body.la_capacite_du_reservoir,
        car.la_date_de_visite = req.body.la_date_de_visite,
        car.save()
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const FindCarByMatricule = async(req,res) => {   
    const car = await CarModel.findOne({matricule: req.body.matricule})
    if(car){
        res.json({status:"ok",data:car,type_de_carburent:car.type_de_carburent})
        console.log(car);
    }
};

module.exports = {ReadCar , CreateCar, DeleteCar, UpdateCar, FindCarByMatricule }