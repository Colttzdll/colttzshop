const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Game = require('../models/Game');
const Purchase = require('../models/Purchase');

// Middleware de autenticação admin (vulnerável - apenas verifica se é admin pelo username e senha)
const adminMiddleware = async (req, res, next) => {
    if (!req.session.isAdmin) {
        return res.redirect('/admin/login');
    }
    next();
};

// Rota para página de login admin
router.get('/login', (req, res) => {
    res.render('admin/login', {
        title: 'Login Administrativo',
        user: req.session.user,
        isAdmin: req.session.isAdmin,
        error: null
    });
});

// Rota de autenticação admin (vulnerável - credenciais hardcoded)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Vulnerável: Credenciais hardcoded
    if (username === 'admin' && password === 'admin') {
        req.session.isAdmin = true;
        return res.redirect('/admin');
    }
    
    res.render('admin/login', {
        title: 'Login Administrativo',
        user: req.session.user,
        isAdmin: req.session.isAdmin,
        error: 'Credenciais administrativas inválidas'
    });
});

// Dashboard admin (vulnerável - expõe todos os dados)
router.get('/', adminMiddleware, async (req, res) => {
    try {
        // Vulnerável: Retorna todos os dados sensíveis
        const users = await User.find();
        const games = await Game.find();
        const purchases = await Purchase.find().populate('user').populate('game');

        res.render('admin/dashboard', {
            title: 'Painel Administrativo',
            user: req.session.user,
            isAdmin: req.session.isAdmin,
            users,
            games,
            purchases
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Logout admin
router.post('/logout', adminMiddleware, (req, res) => {
    req.session.isAdmin = false;
    res.redirect('/admin/login');
});

// Deletar usuário (vulnerável - sem confirmação ou log)
router.post('/users/delete/:id', adminMiddleware, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deletar jogo (vulnerável - sem confirmação ou log)
router.post('/games/delete/:id', adminMiddleware, async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deletar compra (vulnerável - sem confirmação ou log)
router.post('/purchases/delete/:id', adminMiddleware, async (req, res) => {
    try {
        await Purchase.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 