const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Defining the voterSchema
const voterSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true
    },
    rollNumber: {
        type:Number,
        // required: true,
        trim: true,
        // validate --> Add a validator
    },
    email: {
        type: String,
        unique: true,
        required: true,
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
        // required: true,
        trim: true
        // validate --> add a validator
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
    {
    timestamps: true
})

// Virtual Poll Property
voterSchema.virtual('polls', {
    ref: 'Poll',
    localField: '_id',
    foreignField: 'owner'
})

// Hashing the plain text password
voterSchema.pre('save', async function(next) {
    const voter = this
    
    if(voter.isModified('password')) {
        voter.password = await bcrypt.hash(voter.password, 8)
    }

    next()
})

// Finding user by given credentials
voterSchema.statics.findByCredentials = async (email, password) => {
    const voter = await Voter.findOne({ email })

    if(!voter) {
        throw new Error('No voter with such email registered')
    }

    const isMatch = await bcrypt.compare(password, voter.password)

    if(!isMatch) {
        throw new Error('Password is incorrect')
    }

    return voter
}

// Generating token
voterSchema.methods.generateAuthToken = async function () {
    const voter = this 
    const token = jwt.sign({ _id: voter._id.toString() }, 'thisisapollapp')

    voter.tokens = voter.tokens.concat({ token })
    await voter.save()

    return token
}


const Voter = mongoose.model('Voter', voterSchema)
module.exports = Voter