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




app.get('/100', (req, res) => {
  console.log(req.body)
  // db.dig((imgs) => {
  //   res.send(imgs);
  // })
});


app.post('/100', function(req, res) {
  console.log('HIIIIIIIIIIIIII')
  db.save(req.body)
  res.send('worked!')
});



port = 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
})
