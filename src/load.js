var APlayer = require('./APlayer.js');

window.onload = function() {
  function getSongList(playlistid) {
    var xhr = new XMLHttpRequest();
  var url = location.protocol + '//' + location.host + "/songlist?playlistid=" + playlistid;
  //var url = "http://music.163.com/playlist?id=" + playlistid;
  xhr.open('GET', url, false);
  xhr.send();
  if (xhr.status == 200) {
  
    return JSON.parse(xhr.responseText);
  }
  return undefined;
}

var songlist = getSongList(document.getElementById("playlistid").textContent);
//var songlist = getSongList(123534594);

// console.log(songlist);
// console.log(window.innerHeight);
var ap5 = new APlayer({
  element: document.getElementById('player1'),
  narrow: false,
  autoplay: false,
  showlrc: false,
  mutex: true,
  theme: '#ad7a86',
  mode: 'random',
  listmaxheight: (window.innerHeight - 130).toString() + 'px',
  music: songlist
  // [
  //   {
  //     title: 'あっちゅ～ま青春!',
  //     author: '七森中☆ごらく部',
  //     url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
  //     songid: '27602841'
  //   },
  // ]
});
}
