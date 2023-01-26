

function add() {
  
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

  var issueObj = {
    "id": 0,
    "user": user,
    "status": "open",
    "name": name,
    "type": type,
    "priority": priority,
    "description": description, 
    "content": content,
    "attachments": attachments
  };

  

  var numReqUrl = "http://localhost:" + PORT_NUM + "/total_issue_num/";
  var numReq = new XMLHttpRequest();
  numReq.open('GET', numReqUrl, true);
  numReq.responseType = 'text';
  numReq.send();

  numReq.onload = function() {

    var respTxt = numReq.responseText;
    var numObj = JSON.parse(respTxt);
    var num = parseInt(numObj['num']);
    issueObj['id'] = num + 1;
    updateListNum(num + 1, issueObj);
  };
}


function updateListNum(num, issueObj) {
  
  var numObj = {
    "num": num
  };

  var requestUrl = "http://localhost:" + PORT_NUM + "/total_issue_num/";

  var request = new XMLHttpRequest();
  request.open('PUT', requestUrl, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(numObj));

  request.onload = function() {
    updateList(issueObj);
  };
}


function updateList(issueObj) {
  var requestUrl = "http://localhost:" + PORT_NUM + "/issues/";

  var request = new XMLHttpRequest();
  request.open('POST', requestUrl, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(issueObj));

  request.onload = function() {
    window.location.href = "../html/issue_template.html?id=" + issueObj['id'] + "&user=" + issueObj['user'];
  };
}


window.onload = function load() {
  var user = getParam('user');
  var userElements = document.getElementsByName('user');
  for (var i = 0; i < userElements.length; i++) {
    userElements[i].setAttribute('value', user);
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../script/sw.js');
  }
}
