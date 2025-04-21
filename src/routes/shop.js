const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Purchase = require('../models/Purchase');

// Middleware de autenticação vulnerável
const authMiddleware = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'Não autorizado' });
    }
};

// Lista de jogos (vulnerável a XSS nos comentários)
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        // Vulnerável: Renderiza dados não sanitizados
        res.render('shop/index', {
            title: 'Loja de Jogos',
            user: req.session.user,
            games: games
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Adicionar review (vulnerável a XSS)
router.post('/game/:id/review', authMiddleware, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }

        // Vulnerável: Sem sanitização do comentário
        game.userReviews.push({
            user: req.session.user.username,
            comment: req.body.comment,
            rating: req.body.rating
        });

        await game.save();
        res.json(game);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Comprar jogo (vulnerável a CSRF e exposição de dados sensíveis)
router.post('/purchase/:id', authMiddleware, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }

        // Vulnerável: Armazena dados sensíveis do cartão
        const purchase = new Purchase({
            user: req.session.user.id,
            game: game._id,
            price: game.price,
            paymentDetails: {
                cardNumber: req.body.cardNumber,
                expiryDate: req.body.expiryDate,
                cvv: req.body.cvv
            }
        });

        await purchase.save();
        
        // Vulnerável: Retorna dados sensíveis na resposta
        res.json(purchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Histórico de compras (vulnerável a IDOR)
router.get('/purchases/:userId', authMiddleware, async (req, res) => {
    try {
        // Vulnerável: Não verifica se o usuário tem permissão para ver estas compras
        const purchases = await Purchase.find({ user: req.params.userId })
            .populate('game')
            .populate('user');
        
        // Vulnerável: Renderiza dados sensíveis
        res.render('shop/purchases', {
            title: 'Minhas Compras',
            user: req.session.user,
            purchases: purchases
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 