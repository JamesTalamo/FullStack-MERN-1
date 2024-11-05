//ALL Depencencies!
require('dotenv').config()
const express = require('express')
let connectDB = require('./config/db.js')




//Server
const app = express()
app.use(express.json())


app.use('/api/product', require('./route/ProductRoute.js'))



let PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    connectDB()
    console.log(`Listening to ${process.env.PORT}`)
})