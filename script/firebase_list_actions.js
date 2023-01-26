

var uid;

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



function populate_issues(issuesList) {

  var userHid = document.getElementById('user');
  
  var listTable = document.getElementById('list_table');
  listTable.innerHTML = "<tr><th>Issue Id</th><th>Status</th><th>Issue Name</th><th>" + 
                        "Issue Type</th><th>Issue Description</th><th class=\"actions\">" + 
                        "Action</th></tr>";
                        
  for (var key in issuesList) {
    if (key == 'num') {
      continue;
    }

    issueObj = issuesList[key];

    // declare vars
    var row = document.createElement('tr');
    var idCell = document.createElement('td');
    var statusCell = document.createElement('td');
    var nameCell = document.createElement('td');
    var typeCell = document.createElement('td');
    var descriptionCell = document.createElement('td');
    var link = document.createElement('a');

    // init id cell
    row.setAttribute('id', 'issue' + key);
    idCell.setAttribute('id', 'id' + key);
    idCell.innerHTML = key;

    // init status cell
    statusCell.setAttribute('id', 'status' + key);
    if (issueObj['status'] == 'open') {
      row.setAttribute('class', 'openIssue');
      statusCell.innerHTML = 'Open';
    } else {
      row.setAttribute('class', 'closeIssue');
      statusCell.innerHTML = 'Closed';
    }

    // init name cell
    link.setAttribute('href', '../html/issue_firebase.html?id=' + key);
    link.setAttribute('id', "link" + key);
    link.innerHTML = issueObj['name'];
    nameCell.appendChild(link);

    // init type cell
    typeCell.innerHTML = issueObj['type'];

    // init description cell
    descriptionCell.innerHTML = issueObj['description'];

    // init action
    var actionCell = getActionElements(key, issueObj['status']);

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



function getActionElements(id, status) {
  
  var editFrom = document.createElement('form');
  editFrom.setAttribute('action', '../html/edit_firebase.html');
  editFrom.innerHTML = '<input type="hidden" name="id" value="' + 
                       id + '"> <input type="submit" value="Edit">';
 
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



function openCloseIssue(id) {
  
  beginLoading();
  var openBtn = document.getElementById("openBtn" + id);

  var open;
  if (openBtn.value == "open") {
    open = true;
  } else {
    open = false;
  }

  changeStatus(id, open);
}


function changeStatus(id, open) {

  var dir = '/users/' + uid + '/issues/' + id + '/status/';
  var updates = {};
  if (open) {
    updates[dir] = "open";
  } else {
    updates[dir] = "closed";
  }

  var callback = function (error) {
    if (error) {
      alert("Fail to write to the server");
    } else {
      displayStatus(id, open);
      finishLoading();
    }
  }

  firebase.database().ref().update(updates, callback);
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

    beginLoading();

    var dir = '/users/' + uid + '/issues/' + id;

    var callback = function (error) {
      if (error) {
        alert("Fail to write to the server");
      } else {   
        var issueDir = '/users/' + uid + '/issues/';
        firebase.database().ref(issueDir).once('value').then(function(snapshot) {
            populate_issues(snapshot.val());
            finishLoading();
        });
      }
    }

    firebase.database().ref(dir).remove(callback);
  }

}




function logout(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = "index.html";
  }).catch(function(error) {
    // An error happened.
    alert(error.message);
  });
}

window.onload = function load() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      beginLoading();
      uid = user.uid;
      var issueDir = '/users/' + uid + '/issues/';
      firebase.database().ref(issueDir).once('value').then(function(snapshot) {
          populate_issues(snapshot.val());
          finishLoading();
      });
    }
  });
}
