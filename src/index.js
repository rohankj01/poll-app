const express = require('express')
require('./db/mongoose')

const voterRouter = require('./routers/voter')
const pollRouter = require('./routers/poll')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(voterRouter)
app.use(pollRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})