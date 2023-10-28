const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://project-nodeJS:thiet13112004@atlascluster.rdmpiis.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { connect };