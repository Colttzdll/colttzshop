require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Configurações básicas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração de sessão (vulnerável propositalmente)
app.use(session({
    secret: process.env.SESSION_SECRET || 'chave-super-secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Vulnerável: não usa HTTPS
}));

// Conexão com MongoDB (sem autenticação - vulnerável)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Rotas
app.get('/', (req, res) => {
    res.render('index', { 
        user: req.session.user,
        title: 'Página Inicial'
    });
});

// Importação das rotas
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

app.use('/auth', authRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 