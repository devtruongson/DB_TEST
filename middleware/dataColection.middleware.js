const { connectToMongoDB } = require('../db/connectMongo');
const monterTeam = async (req, res, next) => {
    try {
        const db = await connectToMongoDB();
        const result = await db.collection('monterTeam').find({}).toArray();
        req.dbData = result;
        next();
    }
    catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

const accountUser = async (req, res, next) => {
    try {
        const db = await connectToMongoDB();
        const result = await db.collection('users').find({}).toArray();
        req.dbData = result;
        next();
    }
    catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

const products = async (req, res, next) => {
    try {
        const db = await connectToMongoDB();
        const result = await db.collection('product').find({}).toArray();
        req.dbData = result;
        next();
    }
    catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

const dataHome = async (req, res, next) => {
    try {
        const db = await connectToMongoDB();
        const result = await db.collection('contentHome').find({}).toArray();
        req.dbData = result;
        next();
    }
    catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

const dataBanner = async (req, res, next) => {
    try {
        const db = await connectToMongoDB();
        const result = await db.collection('contentBanner').find({}).toArray();
        req.dbData = result;
        next();
    }
    catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

module.exports = {
    monterTeam,
    accountUser,
    products,
    dataHome,
    dataBanner,
};