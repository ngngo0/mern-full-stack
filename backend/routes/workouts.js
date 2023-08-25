//desc: when a request happens, deal with it using the controller fxns

const express = require ('express')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

//instantiate router
const router= express.Router()

//require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

//GET a single workout - colon is route parameter, so changes
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router