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

router.put('/api/workouts/:id', async (req,res) => {
    try {
        const workout = await Workout.findById(req.params.id)
        workout.exercises.push(req.body)
        await workout.save()
        res.status(200).json(workout)     
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
});

router.get('/api/workouts/range', (req,res) => {
    Workout.aggregate([
        {
            $addFields: {
                workoutDuration: {
                    $sum: '$exercises.duration',
                }
            }
        }
    ]).then(workoutsDb => {
        res.json(workoutsDb);
    }).catch(err => {
        console.log(err),
        res.json(err);
    });
});

module.exports = router;