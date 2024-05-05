const express = require('express');
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('public'))

app.get('/check', (req, res) => {
    res.send("ok")
})

app.use('/api/items', itemsRouter);
app.use('/api/users', usersRouter);

module.exports = app;
