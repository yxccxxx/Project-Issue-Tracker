
var userInfo;

function checkPasswordLocal() {

  if (userInfo == null) {
    alert("Please run json-server first and refresh this page");
  }

  var userInput = document.getElementById('user');
  var passwordInput = document.getElementById('password');
  var user = userInput.value;
  var password = passwordInput.value;

  var dbPassword = findPassword(user);

  if (dbPassword == null) {
    alert('This user does not exist!');
  } else if (dbPassword != password) {
    alert('Incorrect Password');
  } else {
    sessionStorage.setItem("local_user", user);
    window.location = "../html/issues_list.html";
  }
}


function findPassword(user) {
  for (var i = 0; i < userInfo.length; i++) {
    if (userInfo[i]['id'] == user) {
      return userInfo[i]['password'];
    }
  }
  return null;
}


function forget() {
  var v = sessionStorage.getItem("storage_version");
  if (v == null || v == "local") {
    alert("Sorry, local version does not support password reset. You can create a new account");
  }
}


function loadLocal() {

  var versionTitle = document.getElementById('version_info');
  versionTitle.innerHTML = "Current Storage Version: Local Storage";
  var message = document.getElementById('version_message');
  message.innerHTML = "Please use json-server to run db.json (port: 3000) on your local machine";
  var switchLink = document.getElementById('switch_link');
  switchLink.className = "firebase";
  switchLink.innerHTML = "Switch to Firebase Storage";
  var submitBtn = document.getElementById('submit_btn');
  submitBtn.setAttribute("onclick", "checkPasswordLocal()");
  var forget = document.getElementById('forget');
  forget.setAttribute("href", "");
  var signup = document.getElementById('signup');
  signup.setAttribute("href", "../html/sign_up.html");


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


function checkPasswordFirebase() {

  beginLoading();

  var email = document.getElementById("user").value;
  var password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted.") {
      errorMessage = "User not existed.";
    }
    alert(errorMessage);
    finishLoading();
  });
}


function loadFirebase() {
  var versionTitle = document.getElementById('version_info');
  versionTitle.innerHTML = "Current Storage Version: Firebase Realtime Database";
  var switchLink = document.getElementById('switch_link');
  switchLink.className = "local";
  switchLink.innerHTML = "Switch to Local Storage";
  var submitBtn = document.getElementById('submit_btn');
  submitBtn.setAttribute("onclick", "checkPasswordFirebase()");
  var forget = document.getElementById('forget');
  forget.setAttribute("href", "../html/forget_password_firebase.html");
  var signup = document.getElementById('signup');
  signup.setAttribute("href", "../html/sign_up_firebase.html");

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      finishLoading();
      window.location.href = "../html/issues_list_firebase.html";
    } 
  });

}


function switchVersion() {
  var switchLink = document.getElementById('switch_link');

  if (switchLink.className == "firebase") {
    sessionStorage.setItem('storage_version', 'firebase');
  } else {
    sessionStorage.setItem('storage_version', 'local');
  }
}


window.onload = function load() {
  var version = sessionStorage.getItem('storage_version');
  
  if (version == null) {
    version = "local";
  }
  
  beginLoading();

  if (version == "local") {
    loadLocal();
  } else {
    loadFirebase();
  }

  finishLoading();

}