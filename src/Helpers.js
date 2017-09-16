var helpers = {
  filter: (data, gifOnly) => {
    var filter = data.data.filter((img) => {
      var isAlbum = img.link.includes('.com/a');
      if(img.hasOwnProperty('type')) {
        var isGif = img.type.includes('gif');
      }
      return (gifOnly) ? !isAlbum && isGif : !isAlbum
    })
    return filter;
  },


  randomNum: (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; 
  }

}


export default helpers
