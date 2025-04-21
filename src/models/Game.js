const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // Vulnerável: campo que permite XSS
    userReviews: [{
        user: String,
        comment: String, // Sem sanitização
        rating: Number
    }],
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', gameSchema); 