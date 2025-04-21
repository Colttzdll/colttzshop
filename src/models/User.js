const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // Sem validação de tamanho mínimo/máximo (vulnerável)
    },
    password: {
        type: String,
        required: true,
        // Senha armazenada em texto puro (vulnerável)
    },
    email: {
        type: String,
        required: true,
        // Sem validação de email (vulnerável)
    },
    cardNumber: {
        type: String,
        // Cartão armazenado em texto puro (vulnerável)
    },
    cardExpiry: {
        type: String,
        // Data de expiração em texto puro (vulnerável)
    },
    cardCVV: {
        type: String,
        // CVV em texto puro (vulnerável)
    },
    isAdmin: {
        type: Boolean,
        default: false
        // Sem validação de papel/permissão (vulnerável)
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Sem hash de senha (vulnerável)
userSchema.pre('save', function(next) {
    // Log expondo dados sensíveis (vulnerável)
    console.log('Novo usuário sendo criado:', {
        username: this.username,
        password: this.password,
        email: this.email,
        cardNumber: this.cardNumber,
        cardExpiry: this.cardExpiry,
        cardCVV: this.cardCVV
    });
    next();
});

// Método de verificação de senha em texto puro (vulnerável)
userSchema.methods.checkPassword = function(password) {
    return this.password === password;
};

module.exports = mongoose.model('User', userSchema); 