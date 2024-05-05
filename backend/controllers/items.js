const Joi = require('joi');
const items = require('../models/items');

const itemSchema = Joi.object({
    name: Joi.string().required().min(1),
    description: Joi.string().min(1),  
    price: Joi.string().required().min(1),
    image: Joi.string().optional(),
    owner: Joi.string().optional()
});


const itemUpdateSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
    description: Joi.string().optional(),
    owner: Joi.string().optional()
});

const getItems = async (req, res) => {
    try {
        const response = await items.findItems();
        if (response) {
            res.json(response);
        }
    } catch (error) {
        console.error(error);
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
        res.status(500).json({ message: "Something went wrong" });
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
            description: req.body.description,
            owner: req.body.owner,
            price: req.body.price,
            image: req.body.image
        };

        const check = await items.findByItem(item);
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
        res.status(500).json({ message: "Something went wrong" });
    }
};


const updateItem = async (req, res) => {
    console.log('Received data:', req.body);
    try {
        const { error } = itemUpdateSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { id, name, price, image, owner, description } = req.body;

        const check = await items.findItemById(id);
        if (check.length === 0) {
            res.status(404).json({ message: "Item not found"});
            return;
        }

        const updatedFields = { name, price, image };

        if (owner) {
            updatedFields.owner = owner;
        }
        if (description) {
            updatedFields.description = description;
        }

        const response = await items.updateItem(id, updatedFields);
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

