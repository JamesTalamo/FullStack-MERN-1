let express = require('express')
let Router = express.Router()
let ProductController = require('../controller/ProductController.js')


Router.get('/', ProductController.getAllProduct)
Router.put('/:id', ProductController.getOneProduct)
Router.post('/', ProductController.postProduct)
Router.delete('/:id', ProductController.deleteProduct)
Router.patch('/:id', ProductController.patchProduct)


module.exports = Router