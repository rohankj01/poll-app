const express = require('express')
const router = new express.Router()

const Voter = require('../models/voter')


// Creating a new user
router.post('/voters',  async (req, res) => {
    const voter = new Voter(req.body)
    try{
        await voter.save()
        res.status(201).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

// Logging-in a user
router.post('/voters/login', async (req, res) => {
    try {
        const voter = await Voter.findByCredentials(req.body.email, req.body.password)
        const token = await voter.generateAuthToken()
        res.send({voter, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router