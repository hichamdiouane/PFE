const FuelModel = require('../models/Fuels')

const ReadEsence = async(req,res) => {   
    try {
        const esence = await FuelModel.findById('64149648a8497e119c7039e5')
        if (!esence || esence.length === 0) {
            return res.json({ error: "No data" })
        }
        res.send(esence)
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};
const ReadGazoil = async(req,res) => {   
    try {
        const gazoil = await FuelModel.findById('64252ebe1a844774432ad079')
        if (!gazoil || gazoil.length === 0) {
            return res.json({ error: "No data" })
        }
        res.send(gazoil)
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

module.exports = {ReadEsence, ReadGazoil}