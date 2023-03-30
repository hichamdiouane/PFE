const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const {CarRoute, TripRoute, FuelRoute} = require('./routes')

// server
const app = express()
const port   = 7777
app.use(cors())
app.use(express.json())
app.use('/',CarRoute)
app.use('/',TripRoute)
app.use('/',FuelRoute)

// connection
const url = "mongodb+srv://pfe:HaRgkTjgWPCYZKGk@cluster0.asfexvl.mongodb.net/pfe"
mongoose.connect(url)
    .then(() => console.log("Connected"))
    .catch(err => console.log(err) )

app.listen(port, () => console.log(`Server is starting at port:${port}`))
