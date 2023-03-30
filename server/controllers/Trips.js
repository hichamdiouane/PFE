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
        // const matricule = newTrip.matricule
        // newTrip.cout = 
        await newTrip.save()
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

module.exports = {ReadTrip , CreateTrip}