
var issueObj;
var callbackCount = 0;
var key;

function edit() {

  var id = document.getElementById('id').value;
 
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
  // Create a reference to the file whose metadata we want to change
  for(var i = 0; i < fileList.length; i++){
    // File or Blob named mountains.jpg
    var storageRef = firebase.storage().ref();
    var file = fileList[i];
    var fileName = randomName();
    attachments.push('images/' + fileName);

    // Create file metadata to update
    var newMetadata = {
      contentType: 'image/jpeg'
    }

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + fileName).put(file, newMetadata);

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

  issueObj['name'] = name;
  issueObj['type'] = type;
  issueObj['priority'] = priority;
  issueObj['description'] = description;
  issueObj['content'] = content;
  issueObj['attachments'] = attachments;

  var dir = '/users/' + uid + '/issues/' + id;
  var updates = {};
  updates[dir] = issueObj;

  var callback = function (error) {
    if (error) {
      alert("Fail to write to the server");
    } else {
      jumpToIssuePage();
    }
  };

  firebase.database().ref().update(updates, callback);
}


function loadOriginalIssue() {
  var id = document.getElementById('id').value;

  var issueDir = '/users/' + uid + '/issues/' + id;
  firebase.database().ref(issueDir).once('value').then(function(snapshot) {
      issueObj = snapshot.val();
      displayOriginalIssue();
  });
}


function displayOriginalIssue() {

  var name = document.getElementById('name');
  var type = document.getElementById('type');
  var description = document.getElementById('description');
  var content = document.getElementById('content');
  var priority = document.getElementById('priority');
  var attachUrl = document.getElementById('attach_url');
  var attachDescription = document.getElementById('attach_description');

  name.value = issueObj['name'];
  type.value = issueObj['type'];   
  description.value = issueObj['description'];
  content.value = issueObj['content'];
  content.innerHTML = issueObj['content'];
  priority.value = issueObj['priority'];

  if (issueObj['attachments']['num'] > 0) {
    attachUrl.value = issueObj['attachments']['1']['url'];
    attachDescription.value = issueObj['attachments']['1']['description'];
  }  

  finishLoading();
}


window.onload = function load() {

  var id = getParam('id');
  key = id;
  var idHid = document.getElementById('id');
  idHid.setAttribute('value', id);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      beginLoading();
      uid = user.uid;
      loadOriginalIssue();
    }
  });
  
}

function jumpToIssuePage() {
  callbackCount --;

  if (callbackCount == 0) {
    finishLoading();
    window.location.href = "../html/issue_firebase.html?id=" + key;
  }
}
