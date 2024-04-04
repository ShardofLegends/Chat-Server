const form = document.getElementById("reg-form");
form.addEventListener("submit", registerUser);

async function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const result = await fetch("http://localhost:9999/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());

  if (result.status === "ok") {
    // everything went fine
    setCookie('username', username, 7);
    window.location.href = "../Interface/index.html";
  } else {
    alert(result.error);
  }
}