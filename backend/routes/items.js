const express = require('express');
const {createItem, getItems, getItemById, updateItem, deleteItem} = require('../controllers/items');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();


router.get('/', getItems);
router.get('/:id', getItemById);
router.use(verifyToken);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem)

module.exports = router;