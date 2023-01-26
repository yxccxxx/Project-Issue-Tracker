

function checkBoxAction() {
  var hideChk = document.getElementById("hideChk");
  var hideStatus = document.getElementById("hideClose");
  if (hideChk.checked) {
    hideCloseIssues();
    hideStatus.value = "true";
  } else {
    showCloseIssues();
    hideStatus.value = "false";
  }
}

function hideCloseIssues() {
  var hideElements = document.getElementsByClassName("closeIssue");
  for (var i = 0; i < hideElements.length; i++) {
    hideElements[i].style.display = "none";
  }
}

function showCloseIssues() {
  var hideElements = document.getElementsByClassName("closeIssue");
  for (var i = 0; i < hideElements.length; i++) {
    hideElements[i].style.display = "";
  }
}

function openCloseIssue(id) {
  
  var requestURL = "http://localhost:" + PORT_NUM + "/issues/" + id;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.send();

  request.onload = function () {
    var issueObj = JSON.parse(request.responseText);
    if (request.status == "200") {
      changeStatus(issueObj, id);
    } else {
      alert('Fail to change status');
      console.error(respTxt);
    }
  }

}


function changeStatus(issueObj, id) {
  var openBtn = document.getElementById("openBtn" + id);

  // alert(issueObj['name']);
  var open;
  if (openBtn.value == "open") {
    issueObj['status'] = "open";
    open = true;
  } else {
    issueObj['status'] = "closed";
    open = false;
  }

  var requestUrl = "http://localhost:" + PORT_NUM + "/issues/" + id;
  var request = new XMLHttpRequest();
  request.open('PUT', requestUrl, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(issueObj));

  request.onload = function() {
    displayStatus(id, open);
  };
}


function displayStatus(id, open) {
  var openBtn = document.getElementById("openBtn" + id);
  var issueRow = document.getElementById("issue" + id);
  var statusBox = document.getElementById("status" + id);
  var hideStatus = document.getElementById("hideClose");

  if (open) {
    issueRow.className = "openIssue";
    statusBox.innerHTML = "Open";
    openBtn.value = "close";
  } else {
    issueRow.className = "closeIssue";
    statusBox.innerHTML = "Closed";
    openBtn.value = "open";
    if (hideStatus.value == "true") {
      hideCloseIssues();
    }
  }
}


function deleteIssue(id) {
  var idStr = document.getElementById("id" + id).innerHTML;
  var issueRow = document.getElementById("issue" + id);
  var issueName = document.getElementById("link" + id).innerHTML;
  var message = "Are you sure you want to delete Issue " + idStr + " - " + issueName + "?"
  var confirmDelete = confirm(message);
  
  if (confirmDelete) {

    var requestURL = "http://localhost:" + PORT_NUM + "/issues/" + id;
    var request = new XMLHttpRequest();
    request.open('DELETE', requestURL);
    request.send();

    request.onload = function () {
      var respTxt = JSON.parse(request.responseText);
      if (request.readyState == 4 && request.status == "200") {
        console.table(respTxt);
        var user = document.getElementById('user').value;
        loadIssues(user);
      } else {
        alert('Fail to delete');
        console.error(respTxt);
      }
    }

    issueRow.className = "deletedIssue";
  }

}


function populate_issues(issuesList, user) {

  var userHid = document.getElementById('user');
  userHid.value = user;
  
  var listTable = document.getElementById('list_table');
  listTable.innerHTML = "<tr><th>Issue Id</th><th>Status</th><th>Issue Name</th><th>" + 
                        "Issue Type</th><th>Issue Description</th><th class=\"actions\">" + 
                        "Action</th></tr>";

  for (var i = 0; i < issuesList.length; i++) {
    var issue = issuesList[i];
    var id = i + 1;
    var urlID = issue['id'];
    
    // declare vars
    var row = document.createElement('tr');
    var idCell = document.createElement('td');
    var statusCell = document.createElement('td');
    var nameCell = document.createElement('td');
    var typeCell = document.createElement('td');
    var descriptionCell = document.createElement('td');
    var link = document.createElement('a');

    // init id cell
    row.setAttribute('id', 'issue' + urlID);
    idCell.setAttribute('id', 'id' + urlID);
    idCell.innerHTML = id;
    
    // init status cell
    statusCell.setAttribute('id', 'status' + urlID);
    if (issue['status'] == 'open') {
      row.setAttribute('class', 'openIssue');
      statusCell.innerHTML = 'Open';
    } else {
      row.setAttribute('class', 'closeIssue');
      statusCell.innerHTML = 'Closed';
    }

    // init name cell
    link.setAttribute('href', '../html/issue_template.html?id=' + urlID + "&user=" + user);
    link.setAttribute('id', "link" + urlID);
    link.innerHTML = issue['name'];
    nameCell.appendChild(link);

    // init type cell
    typeCell.innerHTML = issue['type'];

    // init description cell
    descriptionCell.innerHTML = issue['description'];

    // init action
    var actionCell = getActionElements(urlID, issue['status'], user);

    // put all the cells in the newly created row
    row.appendChild(idCell);
    row.appendChild(statusCell);
    row.appendChild(nameCell);
    row.appendChild(typeCell);
    row.appendChild(descriptionCell);
    row.appendChild(actionCell);

    // add the row to the table
    listTable.appendChild(row);
  }
}


function getActionElements(id, status, user) {
  
  var editFrom = document.createElement('form');
  editFrom.setAttribute('action', '../html/edit.html');
  editFrom.innerHTML = '<input type="hidden" name="id" value="' + 
                       id + '"> <input type="hidden" name="user" value="' + 
                       user + '"> <input type="submit" value="Edit">';
 
  var deleteBtn = document.createElement('input');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('onclick', 'deleteIssue(' + id + ')');
  deleteBtn.setAttribute('value', 'Delete');   

  var closeBtn = document.createElement('input');
  closeBtn.setAttribute('type', 'button');
  closeBtn.setAttribute('onclick', 'openCloseIssue(' + id + ')');
  closeBtn.setAttribute('id', 'openBtn' + id);
  if (status == 'open') {
    closeBtn.setAttribute('value', 'close');
  } else {
    closeBtn.setAttribute('value', 'open');
  }

  var actionCell = document.createElement('td');
  actionCell.setAttribute('class', 'actions');
  actionCell.appendChild(editFrom);
  actionCell.appendChild(deleteBtn);
  actionCell.appendChild(closeBtn);

  return actionCell;
}


function loadIssues(user) {
  var requestUrl = "http://localhost:" + PORT_NUM + "/issues?user=" + user;

  var request = new XMLHttpRequest();
  request.open('GET', requestUrl, true);
  request.responseType = 'text';
  request.send();

  request.onload = function() {
    var respTxt = request.responseText;
    var issuesList = JSON.parse(respTxt);

    populate_issues(issuesList, user);
  };

}


function logout() {
  sessionStorage.removeItem("local_user");
  window.location = "index.html";
}


window.onload = function load() {
  
  var user = sessionStorage.getItem("local_user");
 
  if (user == null) {
    alert("you need to log in");
    window.location = "index.html";
  }

  var hello = document.getElementById('hello');
  hello.innerHTML = "Hello, " + user + "!";

  loadIssues(user);
}
