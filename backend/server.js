require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/bookmarks', require('./src/routes/bookmarks'));

app.get('/', (req, res) => res.send({ ok: true, msg: 'Link Saver API' }));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));