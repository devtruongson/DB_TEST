const express = require('express');
const router = express.Router();
// const { connectToMongoDB } = require('../db/connectMongo');
const {
  monterTeam,
  accountUser,
  products,
  dataHome,
  dataBanner,
} = require('../middleware/dataColection.middleware');

router.get('/authorchef', monterTeam, (req, res) => {
  res.json(req.dbData);
});

router.get('/accountUser', accountUser, (req, res) => {
  res.json(req.dbData);
});

router.get('/product', products, (req, res) => {
  res.json(req.dbData);
});


router.get('/datahome', dataHome, (req, res) => {
  res.json(req.dbData);
});


router.get('/dataBanner', dataBanner, (req, res) => {
  res.json(req.dbData);
});

module.exports = router;