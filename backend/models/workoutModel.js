//desc: enfore structures on data types
const mongoose = require('mongoose')

const Schema = mongoose.Schema

//define the structure of a document inside a model
const workoutSchema = new Schema({
    //what should our workout obj look like?
    title:{
        //what type is it? is it required?
        type: String,
        required: true
    },
    reps:{
        type: Number,
        required: true
    },
    load:{
        type:Number,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
}, {timestamps: true }) //add timestamps to each workout

//use this model to interact with the automatically created collection workouts
module.exports = mongoose.model('Workout', workoutSchema)
