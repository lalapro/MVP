const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
const bodyParser = require('body-parser');
const db = require('./database')

const app = express();
app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

// app.use need routes




app.get('/database', (req, res) => {
  db.dig((imgs) => {
    res.send(imgs);
  })
});


app.post('/downloads', function(req, res) {
  console.log('server', req.body)
  data = req.body.pics;
  data.forEach((pic) => {
    db.save(pic);
  });
  res.send('pics saved!!~~')
});



port = 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
})
