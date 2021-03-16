const mongoose = require('mongoose');
const connectionDatabase = async() => {
    try {     
        await mongoose.connect( process.env.MONGODB_URI2 , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Conexión con la base de datos establecida');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la base de datos');
    }
}

module.exports = { connectionDatabase }