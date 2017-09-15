var search = function(subreddit, callback) {
  console.log('hihi')
  var url = `https://api.imgur.com/3/r/sub/`;

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      callback(data);
    },
    error: function() { console.log("ERRORRRR"); }
    // beforeSend: setHeader
  });

}

export default search
