// Apply saved values from cookies to sliders
function applySavedValues() {
    const savedAutomationSwitch = getCookie('automationSwitch');
    if (savedAutomationSwitch) {
        automationSwitch = parseInt(savedAutomationSwitch);
        document.getElementById('automationSwitch').value = automationSwitch;
    }

    // Apply blur intensity immediately when page is loaded
    applyBlurIntensity();

    const savedColor = getCookie('color');
    if (savedColor) {
        changeCircleColor(savedColor);
        const colorButton = document.querySelector(`#${savedColor}-button`);
        if (colorButton) {
            colorButton.classList.add('selected');
        }
    }
}


// Event listeners for sliders to update variables and restart animation
document.addEventListener("DOMContentLoaded", function() {
    applySavedValues(); // Apply saved values from cookies
    setInitialColor(); // Set the initial color after resetting circles
    toggleAnimationButton(); // Generate circles based on the state of the animation switch
});

// Event listener for automationSwitch slider
document.getElementById('automationSwitch').addEventListener('input', function() {
    automationSwitch = parseInt(this.value);
    setCookie('automationSwitch', automationSwitch, 7); // Save value to cookie
    toggleAnimationButton(); // Turn on animation when slider is changed
});

// Event listeners for color buttons
document.getElementById('green-button').addEventListener('click', function() {
    changeCircleColor('#1eff00');
    setCookie('color', 'green', 7); // Save value to cookie
    removeSelectedClass();
    this.classList.add('selected');
    turnOnAnimation(); // Turn on animation when color button is clicked
});

document.getElementById('red-button').addEventListener('click', function() {
    changeCircleColor('red');
    setCookie('color', 'red', 7); // Save value to cookie
    removeSelectedClass();
    this.classList.add('selected');
    turnOnAnimation(); // Turn on animation when color button is clicked
});

document.getElementById('blue-button').addEventListener('click', function() {
    changeCircleColor('blue');
    setCookie('color', 'blue', 7); // Save value to cookie
    removeSelectedClass();
    this.classList.add('selected');
    turnOnAnimation(); // Turn on animation when color button is clicked
});

document.getElementById('rainbow-button').addEventListener('click', function() {
    changeCircleColorToRainbow();
    setCookie('color', 'rainbow', 7); // Save value to cookie
    removeSelectedClass();
    this.classList.add('selected');
    turnOnAnimation(); // Turn on animation when color button is clicked
});

document.getElementById('dynamic-pinkbluecyan-color-button').addEventListener('click', function() {
    changeCircleColorToDynamicPinkbluecyan();
    setCookie('color', 'dynamic-pinkbluecyan', 7); // Save value to cookie
    removeSelectedClass();
    this.classList.add('selected');
    turnOnAnimation(); // Turn on animation when color button is clicked
});

document.getElementById('dynamic-northernlights-color-button').addEventListener('click', function() {
    changeCircleColorToDynamicNorthernlights();
    setCookie('color', 'dynamic-northernlights', 7); // Save value to cookie
    removeSelectedClass();
    this.classList.add('selected');
    turnOnAnimation(); // Turn on animation when color button is clicked
});



let automationSwitch = true; // Number of state of automationSwitch
let numCircles = 20;  // Number of circles
let circleSize = 8; // Size of the circle
let speed = 0.08;// Speed of the circle
let blurIntensity = 70; // Initial blur intensity
const circles = [];



// Remove selected class from all color buttons
function removeSelectedClass() {
    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach(button => {
        button.classList.remove('selected');
    });
}

function createCircle() {
    const circle = document.createElement('div');
    circle.className = 'moving-circle';
    circle.style.zIndex = '-50'; // Set z-index to -50
    document.body.appendChild(circle);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const minSize = circleSize * 50; // Adjusted based on input
    const maxSize = circleSize * 125; // Adjusted based on input
    const circleSizeValue = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
    let posX, posY;

    // Generate positions outside of the screen
    posX = Math.random() * (screenWidth + circleSizeValue * 2) - circleSizeValue;
    posY = Math.random() * (screenHeight + circleSizeValue * 2) - circleSizeValue;

    const amplitudeX = Math.random() * 50 * speed + 10 * speed; // Random amplitude for curve in X direction
    const amplitudeY = Math.random() * 50 * speed + 10 * speed; // Random amplitude for curve in Y direction
    const frequencyX = Math.random() * 0.002 * speed + 0.001 * speed; // Random frequency for curve in X direction
    const frequencyY = Math.random() * 0.002 * speed + 0.001 * speed; // Random frequency for curve in Y direction
    const time = Math.random() * 1000; // Random initial time offset
    const changeDirectionInterval = Math.random() * 2000 + 1000; // Random interval for changing direction
    const sizeChangeInterval = Math.random() * 3000 + 1000; // Random interval for changing size

    circle.style.width = circle.style.height = circleSizeValue + 'px';
    circle.style.left = posX + 'px';
    circle.style.top = posY + 'px';

    circles.push({element: circle, posX, posY, amplitudeX, amplitudeY, frequencyX, frequencyY, time, changeDirectionInterval, sizeChangeInterval, minSize, maxSize});
}

function animateCircles() {
    circles.forEach(circle => {
        let { element, posX, posY, amplitudeX, amplitudeY, frequencyX, frequencyY, time, changeDirectionInterval, sizeChangeInterval, minSize, maxSize } = circle;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const circleSizeValue = parseInt(circle.element.style.width); // Parsing the width to ensure it's an integer

        const deltaX = amplitudeX * Math.sin(frequencyX * time);
        const deltaY = amplitudeY * Math.cos(frequencyY * time);

        // Multiply by speed here
        posX += deltaX * speed;
        posY += deltaY * speed;

        // Wrap around screen edges
        if (posX > screenWidth + circleSizeValue) posX = -circleSizeValue;
        if (posX < -circleSizeValue) posX = screenWidth + circleSizeValue;
        if (posY > screenHeight + circleSizeValue) posY = -circleSizeValue;
        if (posY < -circleSizeValue) posY = screenHeight + circleSizeValue;

        circle.posX = posX;
        circle.posY = posY;
        circle.time += 1;

        element.style.left = posX + 'px';
        element.style.top = posY + 'px';

        // Randomly change direction
        if (time % changeDirectionInterval === 0) {
            speed *= Math.random() < 0.5 ? -1 : 1; // Adjusting speed direction
        }

        // Randomly change size
        if (time % sizeChangeInterval === 0) {
            const newSize = Math.floor(Math.random() * (maxSize - minSize + 1)) * circleSizeValue;
            element.style.width = element.style.height = newSize + 'px';
        }
    });

    requestAnimationFrame(animateCircles);
}

function animateCircleAppearance() {
    circles.forEach(circle => {
        setTimeout(() => {
            const randomOpacity = Math.random() * 0.6 + 0.2; // Random opacity between 0.2 and 0.8
            circle.element.style.opacity = randomOpacity.toFixed(2); // Set opacity
        }, Math.random() * 3000); // Random delay up to 3 seconds
    });
    animateCircles(); // Start the animation after circles appear
}

// Function to reset circles
function resetCircles() {
    circles.forEach(circle => {
        circle.element.remove();
    });
    circles.length = 0;
    for (let i = 0; i < numCircles; i++) {
        createCircle();
    }
    setInitialColor(); // Set the initial color after resetting circles
    applyBlurIntensity(); // Apply blur intensity immediately
}

function offCircles() {
    circles.forEach(circle => {
        circle.element.remove();
    });
    circles.length = 0;
    applyInitialColor(); // Reset the initial color
    applyBlurIntensity(); // Apply blur intensity immediately
}

function setInitialColor() {
    const lastColor = getCookie('color');
    if (lastColor) {
        if (lastColor === 'dynamic-northernlights') {
            changeCircleColorToDynamicNorthernlights();
        } else if (lastColor === 'dynamic-pinkbluecyan') {
            changeCircleColorToDynamicPinkbluecyan();
        } else if (lastColor === 'rainbow') {
            changeCircleColorToRainbow();
        } else {
            changeCircleColor(lastColor);
        }
        const colorButton = document.querySelector(`#${lastColor}-button`);
        if (colorButton) {
            removeSelectedClass();
            colorButton.classList.add('selected');
        }
    }
}

let dynamicPinkbluecyanColorInterval; // Declare a variable to hold the interval for dynamicPinkbluecyan color change
let dynamicNorthernlightsColorInterval;  // Declare a variable to hold the interval for dynamicNorthernlights color change

let rainbowColorInterval; // Declare a variable to hold the interval for rainbow color change

function changeCircleColor(color) {
    stopColorChange(); // Stop any running color change interval

    numCircles = 20;  // Number of circles
    circleSize = 5; // Size of the circle
    speed = 0.15;// Speed of the circle
    blurIntensity = 8; // Initial blur intensity

    circles.forEach(circle => {
        circle.element.style.backgroundColor = color;
    });
}

function changeCircleColorToRainbow() {
    stopColorChange(); // Stop any running color change interval
    let hue = 0;
    const colorInterval = 0.3; // Adjust this value to change the speed of color transition

    numCircles = 20;  // Number of circles
    circleSize = 5; // Size of the circle
    speed = 0.1;// Speed of the circle
    blurIntensity = 40; // Initial blur intensity

    rainbowColorInterval = setInterval(() => {
        circles.forEach(circle => {
            hue = (hue + colorInterval) % 360;
            const color = `hsl(${hue}, 100%, 50%)`; // Generate color in HSL format
            circle.element.style.backgroundColor = color;
        });
    }, 200); // Adjust the interval to control the speed of color transition
}

function changeCircleColorToDynamicPinkbluecyan() {
    stopColorChange(); // Stop any running color change interval
    const colors = ['#1e90ff', '#ff69b4', '#40e0d0']; // Dark blue, bright pink, turquoise

    numCircles = 12;  // Number of circles
    circleSize = 8; // Size of the circle
    speed = 0.1;// Speed of the circle
    blurIntensity = 60; // Initial blur intensity

    circles.forEach((circle, index) => {
        const colorIndex = index % colors.length;
        circle.element.style.backgroundColor = colors[colorIndex];
    });
}

function changeCircleColorToDynamicNorthernlights() {
    stopColorChange(); // Stop any running color change interval
    const colors = ['#00eeac', '#00cbad', '#1f82a7', '#524094', '#562a84']; // Northen Lights Colors

    numCircles = 35;  // Number of circles
    circleSize = 10; // Size of the circle
    speed = 0.09;// Speed of the circle
    blurIntensity = 80; // Initial blur intensity

    circles.forEach((circle, index) => {
        const colorIndex = index % colors.length;
        circle.element.style.backgroundColor = colors[colorIndex];
    });
}

function stopColorChange() {
    clearInterval(dynamicPinkbluecyanColorInterval); // Stop dynamicPinkbluecyan color change interval
    clearInterval(dynamicNorthernlightsColorInterval); // Stop dynamicNorthernlights color change interval
    clearInterval(rainbowColorInterval); // Stop rainbow color change interval
}


// Function to apply blur intensity to circles
function applyBlurIntensity() {
    circles.forEach(circle => {
        circle.element.style.filter = `blur(${blurIntensity}px)`;
    });
}

function turnOnAnimation() {
    document.getElementById('automationSwitch').checked = true; // Turn on the animation switch
    toggleAnimationButton(); // Generate circles
}

function toggleAnimationButton() {
    const animationSwitch = document.getElementById('automationSwitch');
    if (animationSwitch.checked) {
        resetCircles(); // Generate circles if the switch is on
        animateCircleAppearance();
    } else {
        stopAnimation(); // Stop animation if the switch is off
    }
}

function stopAnimation() {
    circles.forEach(circle => {
        circle.element.remove();
    });
    circles.length = 0;
}
