const pool = require('../db/pool');

const items = {
    findItems: async() => {
        try {
            const connection = await pool.getConnection();
            const [results] = await connection.query(
            'SELECT * FROM `items`'
            );
            connection.release();
            return results;
        } catch (error) {
            throw new Error(error);
        }
    },
    findItemById: async(id) => {
        try {
            const connection = await pool.getConnection();
            const [results] = await connection.query(
                'SELECT * FROM `items` WHERE id=?', [id]
            );
            connection.release();
            return results;
        } catch (error) {
            throw new Error(error);
        }
    },
    createNewItem: async (item) => {
        try {
            const insertQuery = 'INSERT INTO `items` SET ?';
            const connection = await pool.getConnection();
            const [results] = await connection.query(insertQuery, [item]); 
            connection.release();
            return results;
        } catch (error) {
            throw new Error(error);
        }
    },
    updateItem: async (id, newItem) => {
        try {
            const updateQuery = 'UPDATE `items` SET ? WHERE id=?';
            const connection = await pool.getConnection();
            const [results] = await connection.query(updateQuery, [newItem, id]);
            connection.release();
            return results;
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteItem: async (id) => {
        try {
            const deleteQuery = 'DELETE FROM `items` WHERE id=?';
            const connection = await pool.getConnection();
            const [results] = await connection.query(deleteQuery, [id]);
            connection.release();
            return results;
        } catch (error) {
            throw new Error(error);
        }
    },
    searchItemsByName: async(name)  => {
        
    }
};

module.exports = items;