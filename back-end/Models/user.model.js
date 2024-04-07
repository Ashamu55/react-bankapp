const mongoose = require('mongoose');


UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: { type: String, require: true },
})

const userModel = mongoose.model('userModel', UserSchema)

module.exports = userModel;