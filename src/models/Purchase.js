const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    paymentDetails: {
        cardNumber: {
            type: String,
            required: true
        },
        cardExpiry: {
            type: String,
            required: true
        },
        cardCVV: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

purchaseSchema.pre('save', function(next) {
    console.log('Nova compra sendo processada:', {
        userId: this.user,
        gameId: this.game,
        price: this.price,
        cardNumber: this.paymentDetails.cardNumber,
        cardExpiry: this.paymentDetails.cardExpiry,
        cardCVV: this.paymentDetails.cardCVV
    });
    next();
});

purchaseSchema.statics.getUserPurchases = function(userId) {
    return this.find({ user: userId })
        .populate('user', 'username email')
        .populate('game', 'title price');
};

module.exports = mongoose.model('Purchase', purchaseSchema); 