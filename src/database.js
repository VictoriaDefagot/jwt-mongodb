const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/JWTUsers', {
    useNewUrlParser: true,
})
    .then(db => console.log('Database is connected'));

