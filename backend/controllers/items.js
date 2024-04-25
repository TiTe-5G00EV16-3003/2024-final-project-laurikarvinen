const Joi = require('joi');
const items = require('../models/items');

const itemSchema = Joi.object({
    name: Joi.string().required().min(1),
    price: Joi.string().required().min(1),
});
const itemInsertSchema = Joi.object({
    name: Joi.string().required().min(1),
    price: Joi.string().required().min(1),
    image: Joi.string().min(1)
})

const itemUpdateSchema = Joi.object({
    id: Joi.number().required().integer(),
    name: Joi.string().required().min(1),
    price: Joi.string().required().min(1),
    image: Joi.string().min(1)
})

const getItems = async (req, res) => {
    try {
        const response = await items.findItems();
        if (response) {
            res.json(response);
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getItemById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await items.findItemById(id);

        if (response.length === 0) {
            res.status(404).json({ message: "Item not found" });
        } else {
            res.json(response[0]);
        }

    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
};

const createItem = async (req, res) => {
    try {

        const { error } = itemSchema.validate(req.body);

        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const item = {
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
        };

        const check = await items.searchItemsByName(item.name);
        if (check.length === 1) {
            res.status(400).json({ message: "Entry exists" });
            return;
}
        const response = await items.createNewItem(item);

        if (response.affectedRows === 1) {
            const id = response.insertId;
            const addedItem = await items.findItemById(id);
            res.json(addedItem[0]);
        } else {
            res.status(500).json({ message: "Could not add the item" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "something went wrong" });
    }
};


const updateItem = async (req, res) => {
    try {
        const { error } = itemUpdateSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const item = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
        };



        const check = await items.findItemById(item.id);
            if (check.length === 0) {
        res.status(404).json({ message: "Item not found"});
    }

        const response = await items.updateItem(id, item);
        if (response.affectedRows === 1) {
            const updatedItem = await items.findItemById(id);
            res.json(updatedItem[0]);
        } else {
            res.status(500).json({ message: "Could not update the item" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "something went wrong" });
    }
};

const deleteItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const existingItem = await items.findItemById(id);

        if (existingItem.length === 0) {
            res.status(404).json({ message: "Item not found" });
            return;
        }

        const response = await items.deleteItem(id);

        if (response.affectedRows === 1) {
            res.json({ message: "Item deleted successfully" });
        } else {
            res.status(500).json({ message: "Could not delete the item" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "something went wrong" });
    }
};

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem
};

