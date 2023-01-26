
var PORT_NUM = 3000;
var RANDOM_STR = '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';

function getParam(key) {
  var r = window.location.search.substring(1);
  var params = r.split("&");
  for (var i = 0; i < params.length; i++) {
    var pair = params[i].split("=");
    if(pair[0] == key) {
      return pair[1];
    }
  }
  
  return null;
}


function beginLoading() {
  document.getElementById("over").style.display = "block";
  document.getElementById("loading").style.display = "block";
  // document.getElementById("loadingImage").style.display = "";
}

function finishLoading() {
  document.getElementById("over").style.display = "none";
  document.getElementById("loading").style.display = "none";
  // document.getElementById("loadingImage").style.display = "none";
}


function randomName() {
  var timestamp = Date.parse(new Date());
  var randomStr = "";
  for (var i = 0; i < 9; i++) {
    var x = Math.floor((Math.random()*RANDOM_STR.length)+1);
    randomStr += RANDOM_STR[x];
  }
  return timestamp + randomStr;
}

