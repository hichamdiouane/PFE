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
        const newCar = new CarModel(req.body.matricule)
        await newCar.save()
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const DeleteCar = async(req,res) => {   
    try {
        const Car = await CarModel.findOneAndDelete({matricule: req.body.matricule})
        if (!Car || Car.length === 0) {
            return res.json({ error: "No data" });
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const FindCarByMatricule = async(req,res) => {   
    try {
        const car = await CarModel.find({matricule: req.body})
        if (!car || car.length === 0) {
            return res.json({ error: "No data" })
        }
        res.send(car)
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

module.exports = {ReadCar , CreateCar, FindCarByMatricule, DeleteCar}