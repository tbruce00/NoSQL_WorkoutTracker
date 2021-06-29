const router = require('express').Router();
const Workout = require('../models/workout');

router.get("/api/workouts", (req,res) =>{
    Workout.aggregate([
        {
            $addFields: {
                workoutDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ]).then((workoutsDb) => {
        res.json(workoutsDb);   
    }).catch((err) => {
        console.log(err)
        res.json(err);
    }); 
});

router.post("/api/workouts", (req,res) => {
    Workout.create({})
    .then(workoutsDb => {
        res.json(workoutDb);
    }).catch(err => {
        res.status(400).json(err);
    });
});