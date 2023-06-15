const express = require('express');
const {
    createProduct,
    fetchProduct,
    getProductByUser,
    updateProduct,
    deleteProduct
  } = require('../modules/product');
const router = express.Router()


router.get('/:id', fetchProduct)
router.get('/', getProductByUser)
router.post('/create', createProduct)
router.patch('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)



module.exports = router;