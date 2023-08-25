
//desc: take care of all the diff function types for get/post/del by dealing with backend
const Workout = require('../models/workoutModel')
const mongoose =require('mongoose')


// get all workouts
 const getWorkouts = async (req, res) => {
    const user_id = req.user._id

    //all the workout documents in an array, and sort in descending order
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    
    res.status(200).json(workouts)
 }

// get a single workout
const getWorkout = async (req, res) => {
    //grab the id from the route parameters
    const { id } = req.params

    //validate the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout= await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
 }
// create a new workout
const createWorkout = async (req, res) => {
    //grab this info from the reqbody
    const {title, load, reps} = req.body

    let emptyFields=[]

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length!=0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    //add doc to db
    try{
        const user_id = req.user._id
        const workout= await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}
// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    //validate the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

// update a workout

const updateWorkout = async (req, res) => {
    const { id } = req.params

    //validate the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    
    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        //spread the request body out into this response
        ...req.body
    })

    res.status(200).json(workout)
}
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}
