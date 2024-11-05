//ALL Depencencies!
require('dotenv').config()
const express = require('express')
let connectDB = require('./config/db.js')

let path = require('path')


//Server
const app = express()
app.use(express.json())


app.use('/api/product', require('./route/ProductRoute.js'))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}


let PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    connectDB()
    console.log(`Listening to ${process.env.PORT}`)
})