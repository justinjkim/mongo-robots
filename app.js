
const express = require('express');
const mustacheExpress = require('mustache-express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

const app = express();

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));


app.use('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const restaurants = db.collection('restaurants');
    restaurants.find({}).toArray(function (err, docs) {
      res.render("index", {restaurants: docs})
    })
  })
})


app.listen(3000, function (req, res) {
	console.log('Starting up Express app...');
});