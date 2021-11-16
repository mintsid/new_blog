const express = require('express')
const app = express()
const port = 3000
const moment = require('moment')
const today = moment();

app.use(express.urlencoded({extended: false}))
app.use(express.json())


const connect = require("./schemas");
connect();

const boardRouter = require('./routers/board');
app.use('/api',[boardRouter]);


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/test', (req, res) => {
  let name = req.query.name;
  res.render('test', {name});
})

app.get('/home', (req, res) => {
  res.render('board');
})

app.get('/detail', (req, res) => {
  res.render('detail');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})