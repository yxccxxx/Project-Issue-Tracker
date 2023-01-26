
var uid;
var callbackCount = 0;
var key;

function add() {

  var name = document.getElementById('name').value;
  if (name == "") {
    alert("Please enter the issue name");
    return;
  }

  var type = document.getElementById('type').value;
  
  var description = document.getElementById('description').value;
  if (description == "") {
    alert("Please enter the description");
    return;
  }

  beginLoading();

  var content = document.getElementById('content').value;
  
  var priority = document.getElementById('priority').value;

  var fileList = document.getElementById('attachment').files;
  callbackCount = fileList.length + 1;


  var attachments = [];
  attachments = addFile(fileList);

  var issueObj = {
    "id": 0,
    "status": "open",
    "name": name,
    "type": type,
    "priority": priority,
    "description": description, 
    "content": content,
    "attachments": attachments
  };

  var issueDir = '/users/' + uid + '/issues/num';
  firebase.database().ref(issueDir).once('value').then(function(snapshot) {
      var num = parseInt(snapshot.val()) + 1;
      issueObj['id'] = num;
      key = num;
      updateTotalNum(num);
      updateIssueList(num, issueObj);
  });
}


function updateIssueList(key, issueObj) {
  var dir = '/users/' + uid + '/issues/' + key;

  var callback = function (error) {
    if (error) {
      alert("Fail to write to the server");
    } else {
      jumpToIssuePage(2);
    }
  };

  firebase.database().ref(dir).set(issueObj, callback);
}


function updateTotalNum(num) {
  var updates = {};
  var callback = function (error) {
    updateCallback(error);
  };

  var dir = '/users/' + uid + '/issues/num';
  updates[dir] = num;
  firebase.database().ref().update(updates, callback);
}


function updateCallback(error) {
  if (error) {
    alert('update error');
  }
}


window.onload = function load() {
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid;
    } 
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../script/sw.js');
  }

}


function addFile(fileList){
  // Create a root reference
  var storageRef = firebase.storage().ref();
  var attachments = [];

    for(var i = 0; i < fileList.length; i++){
    // File or Blob named mountains.jpg
    var file = fileList[i];

    // Create the file metadata
    var metadata = {
      contentType: file.type
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var fileName = randomName();
    var uploadTask = storageRef.child('images/' + fileName).put(file, metadata);
    attachments.push('images/' + fileName);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, 

      function(error) {
        alert("failed to upload file");
        jumpToIssuePage();  
      }, 

      function() {
        jumpToIssuePage();
      });
  }
  return attachments;
}


function jumpToIssuePage(x) {
  callbackCount --;

  if (callbackCount == 0) {
    finishLoading();
    window.location.href = "../html/issue_firebase.html?id=" + key;
  }
}