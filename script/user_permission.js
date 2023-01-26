

var userInfo;


function signup() {

  var userid = document.getElementById('userid').value;
  var password = document.getElementById('password').value;

  for (key in userInfo) {
    if (userid == userInfo[key]['id']) {
      alert("this name has been used");
      return;
    }
  }

  if (password == null || password == "") {
    alert("please enter password");
    return;
  }

  var userObj = {
    "id": userid,
    "password": password
  }

  var requestUrl = "http://localhost:" + PORT_NUM + "/users/";
  var request = new XMLHttpRequest();
  request.open('POST', requestUrl, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(userObj));

  request.onload = function() {
    alert("user created");
    sessionStorage.setItem("local_user", userid);
    window.location.href = "../html/issues_list.html";
  };
}


window.onload = function load() {
 
  var requestUrl = "http://localhost:" + PORT_NUM + "/users/";

  var request = new XMLHttpRequest();
  request.open('GET', requestUrl, true);
  request.responseType = 'text';
  request.send();

  request.onload = function() {
    var respTxt = request.responseText;
    userInfo = JSON.parse(respTxt);
  };
}

