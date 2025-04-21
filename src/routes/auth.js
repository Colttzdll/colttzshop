const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para exibir página de registro
router.get('/register', (req, res) => {
    res.render('auth/register', { 
        title: 'Criar Conta',
        user: req.session.user
    });
});

// Rota para exibir página de login
router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        user: req.session.user
    });
});

// Rota de registro (vulnerável a XSS e injeção NoSQL)
router.post('/register', async (req, res) => {
    try {
        // Vulnerável: Sem validação ou sanitização de entrada
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password, // Vulnerável: senha em texto puro
            creditCard: req.body.creditCard // Vulnerável: dados sensíveis
        });

        await user.save();
        
        // Vulnerável: Sessão sem proteção adequada
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Redireciona para a loja após o registro
        res.redirect('/shop');
    } catch (error) {
        // Em caso de erro, renderiza a página de registro novamente com a mensagem de erro
        res.render('auth/register', {
            title: 'Criar Conta',
            user: req.session.user,
            error: error.message
        });
    }
});

// Rota de login (vulnerável a brute force e timing attacks)
router.post('/login', async (req, res) => {
    try {
        // Vulnerável: Sem limitação de tentativas
        const user = await User.findByCredentials(req.body.username, req.body.password);
        
        if (!user) {
            return res.render('auth/login', {
                title: 'Login',
                user: null,
                error: 'Usuário ou senha inválidos'
            });
        }

        // Vulnerável: Sessão sem proteção adequada
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Redireciona para a loja após o login
        res.redirect('/shop');
    } catch (error) {
        res.render('auth/login', {
            title: 'Login',
            user: null,
            error: error.message
        });
    }
});

// Rota de logout (vulnerável a CSRF)
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router; 