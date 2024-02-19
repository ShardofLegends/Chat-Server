document.addEventListener("DOMContentLoaded", function() {
  const darkModeSwitch = document.getElementById('dark-mode-toggle');
  
  if (darkModeSwitch) {
    // Load dark mode switch state from cookies
    const darkModeState = getCookie('darkModeEnabled');
    if (darkModeState === "true") {
      darkModeSwitch.checked = true;
    } else {
      darkModeSwitch.checked = false;
    }

    // Apply dark or light mode based on switch state
    applyTheme(darkModeSwitch.checked);

    // Add event listener to save dark mode switch state when changed
    darkModeSwitch.addEventListener('change', function() {
      setCookie('darkModeEnabled', this.checked, 365);
      applyTheme(this.checked);
    });
  }

  // Function to apply theme
  function applyTheme(darkModeEnabled) {
    const mainThemeLink = document.getElementById("main-content-theme");
    const headerThemeLink = document.getElementById("header-content-theme");
    const profileThemeLink = document.getElementById("profile-content-theme");

    if (darkModeEnabled) {
      // Dark mode is enabled, switch to dark mode CSS
      mainThemeLink.href = "/Interface/style/mainDM.css";
      headerThemeLink.href = "/Interface/style/headerDM.css";
      profileThemeLink.href = "/Interface/style/profileDM.css";
    } else {
      // Dark mode is disabled, switch back to default CSS
      mainThemeLink.href = "/Interface/style/main.css";
      headerThemeLink.href = "/Interface/style/header.css";
      profileThemeLink.href = "/Interface/style/profile.css";
    }
  }
});


// chat.html

document.addEventListener("DOMContentLoaded", function() {
  const darkModeState = getCookie('darkModeEnabled');
  if (darkModeState === "true") {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  // Function to apply theme
  function applyTheme(darkModeEnabled) {
    const mainThemeLink = document.getElementById("main-content-theme");
    const headerThemeLink = document.getElementById("header-content-theme");
    const chatThemeLink = document.getElementById("chat-content-theme");

    if (darkModeEnabled) {
      // Dark mode is enabled, switch to dark mode CSS
      mainThemeLink.href = "/Interface/style/mainDM.css";
      headerThemeLink.href = "/Interface/style/headerDM.css";
      chatThemeLink.href = "/Interface/style/chatDM.css";
    } else {
      // Dark mode is disabled, switch back to default CSS
      mainThemeLink.href = "/Interface/style/main.css";
      headerThemeLink.href = "/Interface/style/header.css";
      chatThemeLink.href = "/Interface/style/chat.css";
    }
  }
});


// index.html

document.addEventListener("DOMContentLoaded", function() {
  const darkModeState = getCookie('darkModeEnabled');
  if (darkModeState === "true") {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  // Function to apply theme
  function applyTheme(darkModeEnabled) {
    const mainThemeLink = document.getElementById("main-content-theme");
    const headerThemeLink = document.getElementById("header-content-theme");
    const indexThemeLink = document.getElementById("index-content-theme");

    if (darkModeEnabled) {
      // Dark mode is enabled, switch to dark mode CSS
      mainThemeLink.href = "/Interface/style/mainDM.css";
      headerThemeLink.href = "/Interface/style/headerDM.css";
      indexThemeLink.href = "/Interface/style/indexDM.css";
    } else {
      // Dark mode is disabled, switch back to default CSS
      mainThemeLink.href = "/Interface/style/main.css";
      headerThemeLink.href = "/Interface/style/header.css";
      indexThemeLink.href = "/Interface/style/index.css";
    }
  }
});

  