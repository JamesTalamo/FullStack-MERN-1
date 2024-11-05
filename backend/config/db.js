let mongoose = require('mongoose')

let connectDB = async () => {
    try {
        let conn = mongoose.connect(process.env.MONGO_URI)
        console.log('connected to mongodb')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDB