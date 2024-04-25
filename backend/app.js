const express = require('express');
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.static('public'))
app.use(cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:8088',
      'http://172.16.5.126:8080',
      'http://172.16.5.126'
    ]
  }));
app.get('/check', (req, res) => {
    res.send("ok")
})

app.use('/api/items', itemsRouter);
app.use('/api/users', usersRouter);

module.exports = app;
