import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    reps: { type: Number, min: 1, required: true },
    weight: { type: Number, min: 1, required: true },
    unit: { type: String, enum: ['kgs', 'lbs'], required: true },
    date: { type: String, match: /\d{2}-\d{2}-\d{2}/, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

const findExercise = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

const findExerciseById = async (_id) => {
    const query = Exercise.findById({_id: _id});
    return query.exec();
}

const updateExercise = async (_id, updateObject) => {
    const result = await Exercise.updateOne({_id: _id}, updateObject);
    return result.modifiedCount;
}

const deleteById = async (_id) => {
    const result = await Exercise.deleteMany({_id: _id});
    return result.deletedCount;
}

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export {createExercise, findExercise, findExerciseById, updateExercise, deleteById};