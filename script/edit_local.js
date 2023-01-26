
var issueObj;

function edit() {
 
  var name = document.getElementById('title').value;
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

  var content = document.getElementById('content').value;
  
  var priority = document.getElementById('priority').value;

  var attachUrl = document.getElementById('attach_url').value;
  attachUrl = attachUrl.trim();
  
  var attachDescription = document.getElementById('attach_description').value;

  var attachments = [];

  if (attachUrl != "") {
    attachments = [
      {
        "url": attachUrl,
        "description": attachDescription
      }
    ];
  }

  var user = document.getElementById('user').value;
  var id = document.getElementById('id').value;

  issueObj['name'] = name;
  issueObj['type'] = type;
  issueObj['priority'] = priority;
  issueObj['description'] = description;
  issueObj['content'] = content;
  issueObj['attachments'] = attachments;

  var requestUrl = "http://localhost:" + PORT_NUM + "/issues/" + id;
  var request = new XMLHttpRequest();
  request.open('PUT', requestUrl, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(issueObj));

  request.onload = function() {
    window.location.href = "../html/issue_template.html?id=" + id + "&user=" + user;
  };
}


function loadOriginalIssue() {
  var id = document.getElementById('id').value;

  var requestUrl = "http://localhost:" + PORT_NUM + "/issues/" + id;

  var request = new XMLHttpRequest();
  request.open('GET', requestUrl, true);
  request.responseType = 'text';
  request.send();

  request.onload = function() {
    var respTxt = request.responseText;
    issueObj = JSON.parse(respTxt);
    displayOriginalIssue();
  };
}


function displayOriginalIssue() {
  var name = document.getElementById('title');
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
  if (issueObj['attachments'].length > 0) {
    attachUrl.value = issueObj['attachments'][0]['url'];
    attachDescription.value = issueObj['attachments'][0]['description'];
  }  
}


window.onload = function load() {
  var user = getParam('user');
  var userElements = document.getElementsByName('user');
  for (var i = 0; i < userElements.length; i++) {
    userElements[i].setAttribute('value', user);
  }
  var id = getParam('id');
  var idHid = document.getElementById('id');
  idHid.setAttribute('value', id);
  loadOriginalIssue();

  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    navigator.serviceWorker.register('../script/sw.js');
  }  
}
