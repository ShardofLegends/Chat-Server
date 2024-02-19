
// Apply saved values from cookies to sliders
function applySavedValues() {
    const savedNumCircles = getCookie('numCircles');
    if (savedNumCircles) {
        numCircles = parseInt(savedNumCircles);
        document.getElementById('numCircles').value = numCircles;
    }
    const savedCircleSize = getCookie('circleSize');
    if (savedCircleSize) {
        circleSize = parseFloat(savedCircleSize);
        document.getElementById('circleSize').value = circleSize;
    }
    const savedSpeed = getCookie('speed');
    if (savedSpeed) {
        speed = parseFloat(savedSpeed);
        document.getElementById('speed').value = speed;
    }
    const savedBlurIntensity = getCookie('blurIntensity');
    if (savedBlurIntensity) {
        blurIntensity = parseInt(savedBlurIntensity);
        document.getElementById('blurIntensity').value = blurIntensity; // Set slider value
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


let numCircles; // Number of circles
let circleSize; // Size of the circle
let speed; // Speed of the circle
let blurIntensity; // Initial blur intensity
let speedDirection = 1; // Initialize speed direction
const circles = [];

// Event listeners for sliders to update variables and restart animation
document.addEventListener("DOMContentLoaded", function() {
    applySavedValues(); // Apply saved values from cookies
    setInitialColor(); // Set the initial color after resetting circles
    toggleAnimationButton(); // Generate circles based on the state of the animation switch
});

// Event listener for automation-switch slider
document.getElementById('automation-switch').addEventListener('change', function() {
    toggleAnimationButton();
});    

// Event listener for numCircles slider
document.getElementById('numCircles').addEventListener('input', function() {
    numCircles = parseInt(this.value);
    setCookie('numCircles', numCircles, 7); // Save value to cookie
    resetCircles();
    animateCircleAppearance();
    turnOnAnimation(); // Turn on animation when slider is changed
});

// Event listener for circleSize slider
document.getElementById('circleSize').addEventListener('input', function() {
    circleSize = parseFloat(this.value);
    setCookie('circleSize', circleSize, 7); // Save value to cookie
    resetCircles();
    animateCircleAppearance();
    turnOnAnimation(); // Turn on animation when slider is changed
});

// Event listener for speed slider
document.getElementById('speed').addEventListener('input', function() {
    speed = parseFloat(this.value);
    setCookie('speed', speed, 7); // Save value to cookie
    resetCircles();
    animateCircleAppearance();
    turnOnAnimation(); // Turn on animation when slider is changed
});

// Event listener for blurIntensity slider
document.getElementById('blurIntensity').addEventListener('input', function() {
    blurIntensity = parseInt(this.value);
    setCookie('blurIntensity', blurIntensity, 7); // Save value to cookie
    resetCircles();
    animateCircleAppearance();
    turnOnAnimation(); // Turn on animation when slider is changed
});

// Event listeners for color buttons
document.getElementById('green-button').addEventListener('click', function() {
    changeCircleColor('#00ff00');
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

document.getElementById('yellow-button').addEventListener('click', function() {
    changeCircleColor('yellow');
    setCookie('color', 'yellow', 7); // Save value to cookie
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

document.getElementById('dynamic-color-button').addEventListener('click', function() {
    changeCircleColorToDynamic();
    setCookie('color', 'dynamic', 7); // Save value to cookie
    removeSelectedClass();
    this.classList.add('selected');
    turnOnAnimation(); // Turn on animation when color button is clicked
});

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
        posX += deltaX * speed * speedDirection;
        posY += deltaY * speed * speedDirection;

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
            speedDirection *= Math.random() < 0.5 ? -1 : 1; // Adjusting speed direction
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
        if (lastColor === 'dynamic') {
            changeCircleColorToDynamic();
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

let dynamicColorInterval; // Declare a variable to hold the interval for dynamic color change
let rainbowColorInterval; // Declare a variable to hold the interval for rainbow color change

function changeCircleColor(color) {
    stopColorChange(); // Stop any running color change interval
    circles.forEach(circle => {
        circle.element.style.backgroundColor = color;
    });
}

function changeCircleColorToRainbow() {
    stopColorChange(); // Stop any running color change interval
    let hue = 0;
    const colorInterval = 0.3; // Adjust this value to change the speed of color transition
    rainbowColorInterval = setInterval(() => {
        circles.forEach(circle => {
            hue = (hue + colorInterval) % 360;
            const color = `hsl(${hue}, 100%, 50%)`; // Generate color in HSL format
            circle.element.style.backgroundColor = color;
        });
    }, 200); // Adjust the interval to control the speed of color transition
}

function changeCircleColorToDynamic() {
    stopColorChange(); // Stop any running color change interval
    const colors = ['#1e90ff', '#ff69b4', '#40e0d0']; // Dark blue, bright pink, turquoise
    circles.forEach((circle, index) => {
        const colorIndex = index % colors.length;
        circle.element.style.backgroundColor = colors[colorIndex];
    });
}

function stopColorChange() {
    clearInterval(dynamicColorInterval); // Stop dynamic color change interval
    clearInterval(rainbowColorInterval); // Stop rainbow color change interval
}


// Function to apply blur intensity to circles
function applyBlurIntensity() {
    circles.forEach(circle => {
        circle.element.style.filter = `blur(${blurIntensity}px)`;
    });
}

function turnOnAnimation() {
    document.getElementById('automation-switch').checked = true; // Turn on the animation switch
    toggleAnimationButton(); // Generate circles
}

function toggleAnimationButton() {
    const animationSwitch = document.getElementById('automation-switch');
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
