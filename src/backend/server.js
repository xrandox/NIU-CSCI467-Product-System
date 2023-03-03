require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const inventoryRoutes = require('./routes/inventory')

// Express App
const app = express()

// Logging
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.json())

// Routes
app.use('/api/inventory/', inventoryRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to Database. Listening on port ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })