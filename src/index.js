const express = require('express')
require('./db/mongoose')

const voterRouter = require('./routers/voter')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json)
app.use(voterRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})