const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Poll = require('../models/poll')


// Casting a poll
router.post('/polls', auth, async (req,res) => {
    const poll = new Poll(req.body)
    try {
        await poll.save()
        res.status(201).send(poll)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/polls/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const user = await Poll.findById(_id)
        if(!user) {
            res.status(404).send('No candidate with such id found')
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router