var express = require('express')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var app = express()
const jsdom = require("jsdom");
const { JSDOM } = jsdom;



  function getSongList(playlistid) {
    var xhr = new XMLHttpRequest();
  //var url = location.protocol + '//' + location.host + "/thirdparty?name=amazon&&query=" + query;
  var url = "http://music.163.com/playlist?id=" + playlistid;
  xhr.open('GET', url, false);
  xhr.send();
  var songlist = [];
  if (xhr.status == 200) {
    // var element = document.createElement('html');
    // element.innerHTML = xhr.responseText;
    // var ulElement = element.getElementsByTagName('ul')[0];
    // var linksElement = ulElement.getElementsByTagName('a');

const dom = new JSDOM(xhr.responseText);
var ulElement = dom.window.document.getElementsByTagName('ul')[0];
var linksElement = ulElement.getElementsByTagName('a');

    //var songinfo = JSON.parse(element.getElementsByTagName('textarea')[0].textContent);
    var songinfo = JSON.parse(dom.window.document.getElementsByTagName('textarea')[0].textContent);
    var author;
    var i;
    for (i = 0; i < linksElement.length; i++) {
      var music = {};
      music.title = songinfo[i].name;

      // get all the artists of this song
      author = '';
      var j;
      for (j = 0; j < songinfo[i].artists.length; j++) {
        if (j == 0)
          author += songinfo[i].artists[j].name;
        else
          author += ', ' + songinfo[i].artists[j].name;
      }
      music.author = author;
      music.pic = songinfo[i].album.picUrl;
      music.songid = linksElement[i].attributes[0].value.replace('/song?id=', '');
      songlist.push(music);
    }
    //console.log(songlist)
    return songlist;
  }
  return undefined;
}

function getSongUrl(songid) {
	var xhr = new XMLHttpRequest();
	var url = 'http://music.163.com/api/song/detail/?ids=[' + songid + ']';
	xhr.open('GET', url, false);
	xhr.send();
	if (xhr.status == 200) {
	// console.log('200 OK');
	// console.log(xhr.responseText);
		var json = JSON.parse(xhr.responseText);
		return json.songs[0].mp3Url.replace('http://m', 'http://p');
	}
	return undefined;
}

app.use('/', express.static('static'))
app.set('view engine', 'pug')

app.get('/play', function (req, res) {
  res.render('index', {playlistid : req.query.playlistid})
})

app.get('/songlist', function (req, res) {
  res.send(getSongList(req.query.playlistid))
})

app.get('/songurl', function (req, res) {
  res.send(getSongUrl(req.query.songid))
})

app.listen(80, function () {
  console.log('Netease Music listening on port 80!')
})