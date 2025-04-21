const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // Sem sanitização de HTML (vulnerável a XSS)
    },
    description: {
        type: String,
        required: true,
        // Sem sanitização de HTML (vulnerável a XSS)
    },
    price: {
        type: Number,
        required: true,
        // Sem validação de valor mínimo (vulnerável)
    },
    image: {
        type: String,
        required: true,
        // Sem validação de URL (vulnerável)
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comment: {
            type: String,
            required: true,
            // Sem sanitização de HTML (vulnerável a XSS)
        },
        rating: {
            type: Number,
            required: true,
            // Sem validação de intervalo (vulnerável)
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Log expondo dados sensíveis (vulnerável)
gameSchema.pre('save', function(next) {
    console.log('Novo jogo sendo criado:', {
        title: this.title,
        description: this.description,
        price: this.price,
        image: this.image
    });
    next();
});

// Método vulnerável a injeção NoSQL
gameSchema.statics.search = function(query) {
    // Consulta sem sanitização (vulnerável)
    return this.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ]
    });
};

module.exports = mongoose.model('Game', gameSchema); 