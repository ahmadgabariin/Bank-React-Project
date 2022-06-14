const express = require(`express`)
const path = require(`path`)
const app = express()
const port = 4000
const api = require(`./server/routers/api`)
const mongoose = require(`mongoose`)
mongoose.connect(`mongodb://localhost/Bank` , { useNewUrlParser: true } )


app.use(express.json());
app.use( express.urlencoded( { extended : false } ) )
app.use(`/` , api)


app.listen (port , function () {
    console.log(`Server running on port ${port}`)
})

