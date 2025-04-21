const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Vulnerável: senha armazenada em texto puro
    password: {
        type: String,
        required: true
    },
    // Vulnerável: dados sensíveis expostos
    creditCard: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Vulnerável: Método que permite injeção NoSQL
userSchema.statics.findByCredentials = async function(username, password) {
    // Vulnerável: consulta sem sanitização
    return await this.findOne({ username: username, password: password });
};

module.exports = mongoose.model('User', userSchema); 