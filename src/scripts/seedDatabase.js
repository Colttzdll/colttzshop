require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('../models/Game');

const games = [
    {
        title: "Super Adventure Quest",
        description: "Um jogo de aventura épico cheio de desafios",
        price: 59.99,
        imageUrl: "https://placeholder.com/game1.jpg",
        userReviews: []
    },
    {
        title: "Space Warriors",
        description: "Batalhas espaciais em um universo vasto",
        price: 49.99,
        imageUrl: "https://placeholder.com/game2.jpg",
        userReviews: []
    },
    {
        title: "Medieval Kingdom",
        description: "Construa e gerencie seu próprio reino medieval",
        price: 39.99,
        imageUrl: "https://placeholder.com/game3.jpg",
        userReviews: []
    },
    {
        title: "Racing Champions",
        description: "Corridas emocionantes em pistas realistas",
        price: 29.99,
        imageUrl: "https://placeholder.com/game4.jpg",
        userReviews: []
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Limpa o banco de dados
        await Game.deleteMany({});

        // Insere os jogos
        await Game.insertMany(games);

        console.log('Banco de dados populado com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error);
        process.exit(1);
    }
}

seedDatabase(); 