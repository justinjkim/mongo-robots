const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

app.use('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const restaurants = db.collection('restaurants');
    restaurants.find({}).toArray(function (err, docs) {
      res.render("index", {restaurants: docs})
    })
  })
})
