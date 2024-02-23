const form = document.getElementById("reg-form");
form.addEventListener("submit", registerUser);

async function registerUser(event) {
  event.preventDefault();
  const fullname = document.getElementById("fullname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const result = await fetch("http://localhost:9999/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname,
      username,
      email,
      password,
    }),
  }).then((res) => res.json());

  if (result.status === "ok") {
    // everythign went fine
    alert("Success");
  } else {
    alert(result.error);
  }
}
