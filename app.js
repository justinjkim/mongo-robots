
const express = require('express');
const mustacheExpress = require('mustache-express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, docs) {
      res.render("index", {robots: docs})
    })
  })
});

app.get('/unemployed', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({"job": null}).toArray(function (err, docs) {
      res.render("unemployed", {robots: docs})
    })
  })
});

app.get('/employed', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({"job": {$nin: [null]}}).toArray(function (err, docs) {
      res.render("unemployed", {robots: docs})
    })
  })
})


app.listen(3000, function (req, res) {
	console.log('Starting up Express app...');
});