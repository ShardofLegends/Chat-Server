document.addEventListener("DOMContentLoaded", function () {
  const socket = io("http://127.0.0.1:3600");

  const msgInput = document.querySelector("#message");
  const chatRoom = document.querySelector(".grid-item#general");
  const activity = document.querySelector(".activity");
  const usersList = document.querySelector(".user-list");
  const roomList = document.querySelector(".room-list");
  const chatDisplay = document.querySelector(".chat-display");

  const nameInput = getCookie("username");
  if (nameInput) {
    console.log("Benutzername aus dem Cookie:", nameInput);
  } else {
    console.log("Benutzername nicht im Cookie gespeichert.");
  }

  // Funktion zum Senden einer Nachricht
  function sendMessage() {
    const text = msgInput.value.trim();

    if (text && chatRoom.textContent) {
      socket.emit("message", {
        name: nameInput,
        text: text,
      });

      msgInput.value = "";
      msgInput.focus();
    }
  }

  // Event-Listener für den Klick auf den "Senden"-Button
  document
    .querySelector("form.form-msg button[type='submit']")
    .addEventListener("click", sendMessage);

  // Funktion zum Betreten des Chatrooms
  function enterRoom(e) {
    e.preventDefault();
    const nameInput = getCookie("username"); // Holen Sie sich den Benutzernamen
    const roomName = chatRoom.textContent.trim(); // Holen Sie sich den Raumnamen

    if (nameInput && roomName) {
      // Überprüfen, ob Benutzername und Raumname vorhanden sind
      socket.emit("enterRoom", {
        name: nameInput, // Benutzername senden
        room: roomName, // Raumnamen senden
      });
    }
  }

  // Event-Listener für das Absenden des Formulars beim Betreten des Chatrooms
  document.querySelector(".form-msg").addEventListener("submit", enterRoom);

  // Event-Listener für das Tastendruck-Ereignis im Eingabefeld für Nachrichten
  msgInput.addEventListener("keypress", () => {
    socket.emit("activity", nameInput);
  });

  // Funktion zum automatischen Betreten des General-Chatrooms
  function joinGeneralChat() {
    socket.emit("enterRoom", {
      name: nameInput,
      room: "general",
    });
  }

  // Automatisches Betreten des General-Chatrooms beim Laden der Seite
  window.addEventListener("load", joinGeneralChat);

  document.querySelector(".form-msg").addEventListener("submit", sendMessage);

  msgInput.addEventListener("keypress", () => {
    socket.emit("activity", nameInput);
  });

  // Listen for messages
  socket.on("message", (data) => {
    activity.textContent = "";
    const { name, text, time } = data;
    const li = document.createElement("li");
    li.className = "post";
    if (name === nameInput) li.className = "post post--left";
    if (name !== nameInput && name !== "Admin")
      li.className = "post post--right";
    if (name !== "Admin") {
      li.innerHTML = `<div class="post__header ${
        name === nameInput ? "post__header--user" : "post__header--reply"
      }">
        <span class="post__header--name">${name}</span> 
        <span class="post__header--time">${time}</span> 
        </div>
        <div class="post__text">${text}</div>`;
    } else {
      li.innerHTML = `<div class="post__text">${text}</div>`;
    }
    document.querySelector(".chat-display").appendChild(li);

    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  });

  let activityTimer;
  socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`;

    // Clear after 3 seconds
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
      activity.textContent = "";
    }, 3000);
  });

  socket.on("userList", ({ users }) => {
    showUsers(users);
  });

  socket.on("roomList", ({ rooms }) => {
    showRooms(rooms);
  });

  // function showUsers(users) {
  //   usersList.textContent = "";
  //   if (users) {
  //     usersList.innerHTML = `<em>Users in ${chatRoom.textContent}:</em>`;
  //     users.forEach((user, i) => {
  //       usersList.textContent += ` ${user.name}`;
  //       if (users.length > 1 && i !== users.length - 1) {
  //         usersList.textContent += ",";
  //       }
  //     });
  //   }
  // }

  // function showRooms(rooms) {
  //   roomList.textContent = "";
  //   if (rooms) {
  //     roomList.innerHTML = "<em>Active Rooms:</em>";
  //     rooms.forEach((room, i) => {
  //       roomList.textContent += ` ${room}`;
  //       if (rooms.length > 1 && i !== rooms.length - 1) {
  //         roomList.textContent += ",";
  //       }
  //     });
  //   }
  // }
});
