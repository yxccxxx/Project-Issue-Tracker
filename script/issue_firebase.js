

var uid;
var issueId;

function populateIssue(issue) {

  var title = document.getElementById('title');
  var nameHeader = document.getElementById('name_header');
  title.innerHTML = issue['name'];
  nameHeader.innerHTML = issue['name'];


  // display headers
  var headerStr = "Issue Id: " + issue['id'] + "<br>" + 
                  "Issue Name: " + issue['name'] + "<br>" + 
                  "Issue Type: " + issue['type'] + "<br>" +
                  "Issue Status:" + issue['status'] + "<br>" +
                  "Priority: " + issue['priority'] + "<br>" +
                  "Issue Description: " + issue['description'];
  var header = document.getElementById('header');
  header.innerHTML = headerStr;


  // display text
  var txtDiv = document.getElementById('content_text');
  var contentStr = issue['content'];
  var paragraphs = contentStr.split('\n');
  for (var i = 0; i < paragraphs.length; i++) {
    var pElement = document.createElement('p');
    pElement.innerHTML = paragraphs[i];
    txtDiv.appendChild(pElement);
  }

  // display images
  var figDiv = document.getElementById('content_figures');
  var figs = issue['attachments'];

  for (var figKey in figs) {
    var fig = figs[figKey];

    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var storageRef = storage.ref();
    
    storageRef.child(fig).getDownloadURL().then(function(url) {
      // `url` is the download URL for 'images/stars.jpg'
      // Or inserted into an <img> element:
      var figElement = document.createElement('figure');
      imgElement = document.createElement('img');
      imgElement.setAttribute('src', url);
      imgElement.setAttribute('alt', 'This image cannot be loaded.');
      figElement.appendChild(imgElement);
      figDiv.appendChild(figElement);
      
    }).catch(function(error) {
      // Handle any errors
    });
  }
}



window.onload = function load() {

  var issueId = parseInt(getParam('id'));
  var topHid = document.getElementById('top_hidden');
  topHid.value = issueId;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      beginLoading();
      uid = user.uid;
      var issueDir = 'users/' + uid + '/issues/' + issueId;
      firebase.database().ref(issueDir).once('value').then(function(snapshot) {
         populateIssue(snapshot.val());
         finishLoading();
      });
    }
  });

}