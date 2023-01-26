

function populate_issue(issue) {

  var title = document.getElementById('title');
  var nameHeader = document.getElementById('name_header');
  title.innerHTML = issue['name'];
  nameHeader.innerHTML = issue['name'];


  // display headers
  var headerStr = "Issue Name: " + issue['name'] + "<br>" + 
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

  for (var i = 0; i < figs.length; i++) {
    var fig = figs[i];
    var figElement = document.createElement('figure');

    var imgElement = document.createElement('img');
    imgElement.setAttribute('src', fig['url']);
    imgElement.setAttribute('alt', fig['description']);
  
    var figcap = document.createElement('figcaption');
    figcap.innerHTML = fig['description'];

    figElement.appendChild(imgElement);
    figElement.appendChild(figcap);
    figDiv.appendChild(figElement);
  }
}


function load_issue(id) {
  var requestUrl = "http://localhost:" + PORT_NUM + "/issues/" + id;

  var request = new XMLHttpRequest();
  request.open('GET', requestUrl, true);
  request.responseType = 'text';
  request.send();

  request.onload = function() {
    var respTxt = request.responseText;
    var issue = JSON.parse(respTxt);
    populate_issue(issue);
  };
}


function setBackButton(user) {
  var userParam = document.getElementById('user');
  userParam.setAttribute('value', user);
}


window.onload = function load() {
  var id = parseInt(getParam('id'));
  var user = getParam('user');
  load_issue(id);
  setBackButton(user);
}