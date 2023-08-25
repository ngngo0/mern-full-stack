//cmd is nodemon start aka npm run dev
//environment variable things
require('dotenv').config()

//we need these since its backend stuff
const express = require('express')
const mongoose = require('mongoose')

//use the routes we exported
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

//first thing that runs --> middleware
app.use(express.json()) 
//checks if request has some body/data then attaches it to req(need for req.body in routesthingy)

app.use((req,res,next) => {
    //logger
    console.log(req.path, req.method)
    next()
})

//route handeler. request obj info about the req, and res obj to send back
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
//relative so it becomes /api/workouts-/thatroute-

// connect to db using mongoose, odm-adding required structure as ckasses
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


