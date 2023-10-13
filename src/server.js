const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

// Routes
const routes = require('./routes')
// database
const db = require('./models')

const app = express();

// Middleware pour parser le JSON
app.use(bodyParser.json());

// Configuration de la connexion à MongoDB
const dbURI = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@atlascluster.jksjfrm.mongodb.net/${process.env.DATABASE_NAME}`;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected... '))
.catch(err => console.log(err));

// Exemple de route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
