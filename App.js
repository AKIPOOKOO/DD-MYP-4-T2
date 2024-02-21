const designContainer = document.querySelector('.design-container');
const commentBtn = document.querySelector('.Comment-btn');
let canComment = true;

commentBtn.addEventListener('click', () => {
  canComment = !canComment;

  if (canComment) {
    // if canComment is true, enable commenting
    designContainer.addEventListener('click', createComment);
    designContainer.addEventListener('click', removeCommentListener);
    commentBtn.classList.remove('disabled');
  } else {
    // if canComment is false, disable commenting
    designContainer.removeEventListener('click', createComment);
    designContainer.removeEventListener('click', removeCommentListener);
    commentBtn.classList.add('disabled');
  }
});

function createComment(event) {
  // create a new comment element
  const comment = document.createElement('div');
  comment.classList.add('comment');

  // create a paragraph element to hold the comment text
  const commentText = document.createElement('p');
  commentText.textContent = 'New comment';
  comment.appendChild(commentText);

  // create an edit button for the comment
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    const newText = prompt('Enter new comment text:');
    commentText.textContent = newText;
  });
  comment.appendChild(editButton);

  // create a delete button for the comment
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    comment.remove();
  });
  comment.appendChild(deleteButton);

  // set the position of the comment element using the X and Y coordinates of the click event
  comment.style.top = event.clientY + 'px';
  comment.style.left = event.clientX + 'px';

  // append the comment element to the design container
  designContainer.appendChild(comment);
}

const settingsBtn = document.querySelector('.Settings-btn');
const popupContainer = document.querySelector('.popup-container');

settingsBtn.addEventListener('click', () => {
    popupContainer.style.display = popupContainer.style.display === 'block' ? 'none' : 'block';
});

// Get the project status dropdown and container elements
const projectStatusDropdown = document.querySelector('.project-status-dropdown');
const projectStatusContainer = document.querySelector('.project-status-container');

// Add event listener to dropdown select element
projectStatusDropdown.addEventListener('change', function() {
  // Get the selected option value
  const selectedOptionValue = projectStatusDropdown.value;
  
  // Update the background color of the project status container based on the selected option
  switch (selectedOptionValue) {
    case 'in-progress':
      projectStatusContainer.style.backgroundColor = '#eeee36';
      break;
    case 'for-review':
      projectStatusContainer.style.backgroundColor = '#ecb347';
      break;
    case 'approved':
      projectStatusContainer.style.backgroundColor = '#6dd36d';
      break;
    default:
      projectStatusContainer.style.backgroundColor = '#ffffff';
      break;
  }
});

// Get references to the input field, save button, and label
const projectNameInput = document.getElementById('project-name-input');
const saveProjectNameButton = document.getElementById('save-project-name');
const projectNameLabel = document.getElementById('project-name-label');

// Set the initial project name
let projectName = 'Default Project Name';

// Check if there is a saved project name in local storage and use it if there is
if (localStorage.getItem('projectName')) {
  projectName = localStorage.getItem('projectName');
}


projectNameLabel.textContent = projectName;


saveProjectNameButton.addEventListener('click', function() {

  const newProjectName = projectNameInput.value.trim();


  if (newProjectName !== '') {
    projectNameLabel.textContent = newProjectName;
    localStorage.setItem('projectName', newProjectName);
  }


  projectNameInput.value = '';
});

designContainer.addEventListener("dblclick", function() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = function() {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function() {
      designContainer.style.backgroundImage = `url('${reader.result}')`;
    };
    reader.readAsDataURL(file);
  };
  input.click();
});

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var isDrawing = false;

canvas.addEventListener("mousedown", function(e) {
    isDrawing = true;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", function(e) {
    if (isDrawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

canvas.addEventListener("mouseup", function(e) {
    isDrawing = false;
});

canvas.addEventListener("mouseleave", function(e) {
    isDrawing = false;
});

const saveBtn = document.querySelector('.AllSave-btn');

saveBtn.addEventListener('click', () => {

  // Get the text content of the project name label
  const projectName = document.querySelector('#project-name-label').textContent;

  // Get the value of the project status dropdown
  const projectStatus = document.querySelector('.project-status-dropdown').value;

  // Create an object with the data to be saved
  const savedData = {
    projectName,
    projectStatus
  };

  // Save the data to local storage
  localStorage.setItem('savedData', JSON.stringify(savedData));
});

// Load saved data
const savedData = JSON.parse(localStorage.getItem('savedData'));

if (savedData) {

  // Set the text content of the project name label
  document.querySelector('#project-name-label').textContent = savedData.projectName;

  // Set the value of the project status dropdown
  document.querySelector('.project-status-dropdown').value = savedData.projectStatus;
}


