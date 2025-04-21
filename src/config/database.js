const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Conexão sem SSL/TLS (vulnerável)
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: false,
            // Sem autenticação de certificado (vulnerável)
            sslValidate: false
        });

        // Log expondo detalhes da conexão (vulnerável)
        console.log(`MongoDB Conectado: ${conn.connection.host}:${conn.connection.port}`);
        console.log(`Database: ${conn.connection.name}`);
        console.log(`Username: ${conn.connection.user}`);
        
        // Expõe eventos de conexão (vulnerável)
        mongoose.connection.on('error', (err) => {
            console.error('Erro de conexão:', err.stack);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB desconectado');
        });

    } catch (error) {
        // Log de erro expondo detalhes sensíveis (vulnerável)
        console.error('Erro ao conectar ao MongoDB:', error.stack);
        process.exit(1);
    }
};

module.exports = connectDB; 