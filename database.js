const mongoose = require('mongoose');

mongoose.connect('mongodb://lalapo:123@ds135594.mlab.com:35594/hackreactormvp', {useMongoClient:true});


let repoSchema = mongoose.Schema({
  title: String,
  views: Number,
  score: Number,
  sub: String,
  link: String
});

let MyAlbum = mongoose.model('MyAlbum', repoSchema);

let save = (img) => {
  console.log('database', img)
  MyAlbum.create({
    title: img.title,
    views: img.views,
    score: img.score,
    sub: img.sub,
    link: img.pic,
  })
}

let dig = (callback) => {
  MyAlbum.find((err, imgs) => {
    callback(imgs);
  })
}

module.exports.save = save;
module.exports.dig = dig;

// { pic: 'https://i.imgur.com/vrilVVO.jpg',
//   title: '[PIC] Louise and Tash playing their favorite game, "dentist."',
//   views: 1983,
//   score: 427,
//   sub: 'dogs',
//   size: { maxWidth: '150px', maxHeight: '150px' } }

// export default save;
