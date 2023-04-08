const TripModel = require('../models/Trips')

const ReadTrip = async(req,res) => {   
    try {
        const trips = await TripModel.find()
        if (!trips || trips.length === 0) {
            return res.json({ error: "No data" })
        }
        res.send(trips)
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const CreateTrip = async(req,res) => {   
    try {
        const newTrip = new TripModel(req.body)
        await newTrip.save()
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const DeleteTrip = async(req,res) => {   
    try {
        const matricule = req.params.matricule;
        const trip = await TripModel.findOneAndDelete({matricule: matricule})
        if (!trip || trip.length === 0) {
            return res.json({ error: "No data" })
        }
        res.status(200).send('trip deleted');
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const UpdateTrip = async(req,res) => {   
    try {
        const trip = await TripModel.findOne({matricule: req.body.matricule1})
        trip.matricule = req.body.matricule,   
        trip.date = req.body.Date,
        trip.distance= req.body.Distance,
        trip.quantite = req.body.Quantite, 
        trip.consommation = req.body.Consommation,
        trip.cout = req.body.Cout,
        trip.save()
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

module.exports = {ReadTrip , CreateTrip, DeleteTrip,UpdateTrip}