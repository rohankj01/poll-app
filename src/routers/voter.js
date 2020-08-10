const express = require('express')
const router = new express.Router()



const Voter = require('../models/voter')


// Creating a new user
router.post('/voters', async (req, res) => {
    // const voter = new Voter(req.body)
    // try{
    //     await voter.save()
    //     res.status(201).send()
    // } catch(e) {
    //     res.status(400).send(e)
    // }
    console.log("testing")
})

module.exports = router