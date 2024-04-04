/////////////////////////////////////////////////////////////////////////////////////////

//   SWITCH CONTROL

/////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
  const switches = document.querySelectorAll('input[type="checkbox"]');
  
  // Load switch states from cookies
  switches.forEach(switchElement => {
    const switchId = switchElement.id;
    const switchState = getCookie(switchId);
    if (switchState === "true") {
      switchElement.checked = true;
    } else {
      switchElement.checked = false;
    }
    
    // Add event listener to save switch state when changed
    switchElement.addEventListener('change', function() {
      setCookie(switchId, this.checked, 365);
    });
  });
});



/////////////////////////////////////////////////////////////////////////////////////////

//   PROFILE PICTURE

/////////////////////////////////////////////////////////////////////////////////////////


const fileInput = document.getElementById('fileInput');
const profilePicture = document.getElementById('profilePicture');

fileInput.addEventListener('change', function() {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener('load', function() {
      const imageUrl = this.result;
      profilePicture.innerHTML = `<img src="${imageUrl}" alt="Profile Picture">`;
    });

    reader.readAsDataURL(file);
  }
});


//   PROFILE PICTURE SQUARE SIZE CALCULATOR
/////////////////////////////////////////////////////////////////////////////////////////

window.onload = function() {
  resizeCircle();
  window.addEventListener('resize', resizeCircle);
};

function resizeCircle() {
  var circle = document.querySelector('#profilePicture');
  circle.style.height = circle.offsetWidth + 'px'; // set height equal to width
}





/////////////////////////////////////////////////////////////////////////////////////////

//   CHANGE USERNAME

/////////////////////////////////////////////////////////////////////////////////////////

// Variables to store the names
let name1 = "John Doe";
let name2 = "Jane Doe";

// Function to update the displayed name
function updateDisplayedName(currentNameElement, newName) {
    currentNameElement.innerText = newName;
}

// Add event listeners to all name containers
document.querySelectorAll('.profile-user-datafield').forEach((container, index) => {
    const currentName = container.querySelector('.currentName');
    const editButton = container.querySelector('.editButton');
    const saveButton = container.querySelector('.saveButton');
    const newNameInput = container.querySelector('.newNameInput');

    editButton.addEventListener('click', function() {
        editButton.style.display = 'none'; // Hide edit button
        saveButton.style.display = 'inline'; // Display save button
        newNameInput.style.display = 'inline'; // Display text field
        newNameInput.value = currentName.innerText.trim(); // Set text field value to current name
        currentName.style.display = 'none'; // Hide current name
    });

    saveButton.addEventListener('click', function() {
        var newName = newNameInput.value;
        if (newName) {
            updateDisplayedName(currentName, newName); // Update the displayed name
            editButton.style.display = 'inline'; // Display edit button
            saveButton.style.display = 'none'; // Hide save button
            newNameInput.style.display = 'none'; // Hide text field
            currentName.style.display = 'inline'; // Display current name
        } else {
            alert('Please enter a valid name.');
        }
    });
});