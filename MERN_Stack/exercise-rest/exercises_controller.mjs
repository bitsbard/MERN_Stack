import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;
 
const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve exercises. 
 * All exercises are returned.
 */
 app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercise(filter, '', 0)
        .then(exercises => {
            res.status(200).json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

});

/**
 * Retrieve the exercise corresponding to the ID provided in the URL.
 */
 app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: 'Not found' });
            }         
         })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

// Validation functions for update

function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function isRepsValid(reps) {
    if (isNaN(reps)) {
        return false
    } else {
        return true
    }
}

function isIdValid(_id) {
    if (_id === null) {
        return false
    } else {
        return true
    }
}

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit, and date to the values provided in the body.
 */
 app.put('/exercises/:_id', (req, res) => {
    if (isDateValid(req.body.date) === true && isRepsValid(req.body.reps) === true) {
    exercises.updateExercise(req.params._id, req.body)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
            } else if (isIdValid(req.params._id) === true) {
                res.status(404).json({ Error: 'Not found' });
            } else {
                res.status(400).json({ Error: 'Invalid request' });
            }
        });
    } else {
        res.status(400).json({ Error: 'Invalid request' });
    }
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
 app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});