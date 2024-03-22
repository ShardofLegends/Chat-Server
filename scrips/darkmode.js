document.addEventListener("DOMContentLoaded", function () {
  const darkModeSwitch = document.getElementById("dark-mode-toggle");

  if (darkModeSwitch) {
    // Load dark mode switch state from cookies
    const darkModeState = getCookie("darkModeEnabled");
    if (darkModeState === "true") {
      darkModeSwitch.checked = true;
    } else {
      darkModeSwitch.checked = false;
    }

    // Apply dark or light mode based on switch state
    applyTheme(darkModeSwitch.checked);

    // Add event listener to save dark mode switch state when changed
    darkModeSwitch.addEventListener("change", function () {
      setCookie("darkModeEnabled", this.checked, 365);
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
      mainThemeLink.href = "./style/main/mainDM.css";
      headerThemeLink.href = "./style/header/headerDM.css";
      profileThemeLink.href = "./style/profile/profileDM.css";
    } else {
      // Dark mode is disabled, switch back to default CSS
      mainThemeLink.href = "./style/main/main.css";
      headerThemeLink.href = "./style/header/header.css";
      profileThemeLink.href = "./style/profile/profile.css";
    }
  }
});

// chat.html

document.addEventListener("DOMContentLoaded", function () {
  const darkModeState = getCookie("darkModeEnabled");
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
      mainThemeLink.href = "./style/main/mainDM.css";
      headerThemeLink.href = "./style/header/headerDM.css";
      chatThemeLink.href = "./style/chat/chatDM.css";
    } else {
      // Dark mode is disabled, switch back to default CSS
      mainThemeLink.href = "./style/main/main.css";
      headerThemeLink.href = "./style/header/header.css";
      chatThemeLink.href = "./style/chat/chat.css";
    }
  }
});

// index.html

document.addEventListener("DOMContentLoaded", function () {
  const darkModeState = getCookie("darkModeEnabled");
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
      mainThemeLink.href = "./style/main/mainDM.css";
      headerThemeLink.href = "./style/header/headerDM.css";
      indexThemeLink.href = "./style/index/indexDM.css";
    } else {
      // Dark mode is disabled, switch back to default CSS
      mainThemeLink.href = "./style/main/main.css";
      headerThemeLink.href = "./style/header/header.css";
      indexThemeLink.href = "./style/index/index.css";
    }
  }
});

// login.html / signup.html

document.addEventListener("DOMContentLoaded", function () {
  const darkModeState = getCookie("darkModeEnabled");
  if (darkModeState === "true") {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  // Function to apply theme
  function applyTheme(darkModeEnabled) {
    const mainThemeLink = document.getElementById("main-content-theme");
    const headerThemeLink = document.getElementById("header-content-theme");
    const loginsignupThemeLink = document.getElementById("login-signup-content-theme");

    if (darkModeEnabled) {
      // Dark mode is enabled, switch to dark mode CSS
      mainThemeLink.href = "./style/main/mainDM.css";
      headerThemeLink.href = "./style/header/headerDM.css";
      loginsignupThemeLink.href = "./style/login-signup/login-signupDM.css";
    } else {
      // Dark mode is disabled, switch back to default CSS
      mainThemeLink.href = "./style/main/main.css";
      headerThemeLink.href = "./style/header/header.css";
      loginsignupThemeLink.href = "./style/login-signup/login-signup.css";
    }
  }
});

