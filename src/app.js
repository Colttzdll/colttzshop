const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const connectDB = require('./config/database');

// Importando rotas
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const app = express();

// Conectar ao MongoDB
connectDB();

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração de sessão vulnerável (propositalmente)
app.use(session({
    secret: '123456', // Senha fraca proposital
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collection: 'sessions'
    }),
    cookie: {
        httpOnly: false, // Vulnerável a XSS
        secure: false, // Vulnerável - não requer HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 dias
    }
}));

// Middleware global para expor dados sensíveis (proposital)
app.use((req, res, next) => {
    // Expõe dados da sessão no header (vulnerável)
    res.header('X-Session-Data', JSON.stringify(req.session));
    next();
});

// Rotas
app.use('/auth', authRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);

// Rota inicial vulnerável
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Início',
        user: req.session.user,
        message: req.query.message // Vulnerável a XSS
    });
});

// Tratamento de erros básico (propositalmente inseguro)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack); // Expõe detalhes do erro
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 