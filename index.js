const express = require('express')
const app = express()
const port = 3000



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

app.get('/', (req, res) => {
  res.render('board');
})

app.get('/write', (req, res) => {
  res.render('write');
})

app.get('/detail', (req, res) => {
  res.render('detail');
})

app.get('/rewrite', (req, res) => {
  res.render('rewrite');
})


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})