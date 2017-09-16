const mongoose = require('mongoose');

mongoose.connect('mongodb://lalapo:123@ds135594.mlab.com:35594/hackreactormvp', {useMongoClient:true});


let repoSchema = mongoose.Schema({
  id: String,
  title: String,
  link: String,
  views: Number,
  score: Number,
  nsfw: Boolean
});

let MyAlbum = mongoose.model('MyAlbum', repoSchema);

let save = (img) => {
  MyAlbum.create({
    id: img.id,
    title: img.title,
    link: img.link,
    views: img.views,
    score: img.score,
    nsfw: img.nsfw
  })
}

let dig = (callback) => {
  MyAlbum.find((err, imgs) => {
    callback(imgs);
  })
}

module.exports.save = save;
module.exports.dig = dig;

// export default save;
