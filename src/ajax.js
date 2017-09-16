var search = function(subreddit, callback) {

  var url = `https://api.imgur.com/3/gallery/r/${subreddit}/`;
  var setHeader = {
    'Authorization':'Client-ID e4be40d619245ca'
  }

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    headers: {
      'Authorization':'Client-ID e4be40d619245ca'
    },
    limit: 50,
    success: function(data) {
      callback(data);
    },
    error: function() { console.log("ERRORRRR"); }
  });

}

export default search
