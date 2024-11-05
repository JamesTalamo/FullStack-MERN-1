let Product = require('../models/Product.js')

let getAllProduct = async (req, res) => {
    try {
        let exist = await Product.find({})
        return res.status(200).json({ success: true, data: exist })


    } catch (error) {
        console.error("Error in post Product", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

let getOneProduct = async (req, res) => {
    let { id } = req.params
    try {

        let exist = await Product.findOne({ _id: id })
        if (!exist) return res.status(400).json({ success: false, message: "ID does not exist" })

        res.status(200).json({ success: true, data: exist })


    } catch (error) {
        console.error("Error in get Product", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

let postProduct = async (req, res) => {
    let productBody = req.body
    if (!productBody.name || !productBody.price || !productBody.image) {
        return res.status(400).json({ success: false, message: "name price image needs to have a value" })
    }

    try {
        const newProduct = new Product(productBody)
        await newProduct.save()
        res.status(200).json({ success: true, data: newProduct, message: 'Updated Successfully' })
    } catch (error) {
        console.error("Error in post Product", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

let deleteProduct = async (req, res) => {
    let { id } = req.params
    try {

        let exist = await Product.findByIdAndDelete(id)
        if (!exist) return res.status(400).json({ success: false, message: "ID does not exist" })

        res.status(200).json({ success: true, message: `Deleted Successfully` })


    } catch (error) {
        console.error("Error in delete Product", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }

}

let patchProduct = async (req, res) => {
    let { id } = req.params
    let productBody = req.body

    try {

        // let exist = await Product.findOne({ _id: id })

        // if (!exist) return res.status(400).json({ success: false, message: "ID does not exist" })
        // if (!productBody.name || !productBody.price || !productBody.image) {
        //     return res.status(400).json({ success: false, message: "name price image needs to have a value" })
        // }

        // exist.name = productBody.name
        // exist.price = productBody.price
        // exist.image = productBody.image

        // await exist.save()

        const exist = await Product.findByIdAndUpdate(id, productBody, { new: true })
        if (!exist) return res.status(400).json({ success: false, message: "ID does not exist" })
        res.status(200).json({ success: true, data: exist, message: 'Updated Successfully' })


    } catch (error) {
        console.error("Error in patch Product", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

module.exports = {
    getAllProduct,
    getOneProduct,
    postProduct,
    deleteProduct,
    patchProduct
}