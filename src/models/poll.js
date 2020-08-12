const mongoose = require('mongoose')
// const validator = require('validator')

const pollSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     requred:true,
    //     ref: 'Voter'
    // }
},
    {
        timestamps: true
})

const Poll = mongoose.model('Poll', pollSchema)
module.exports = Poll