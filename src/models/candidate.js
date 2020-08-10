const mongoose = require('mongoose')
const validator = require('validator')

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rollNumber: {
        type: Number,
        required: true,
        trim: true
        // validate --> Add a validator
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    hall: {
        type: Number,
        required: true,
        trim:  true,
        // validate --> add a validator
    }},
    {
        timestamps: true
})

const Candidate = mongoose.model('Candidate', candidateSchema)