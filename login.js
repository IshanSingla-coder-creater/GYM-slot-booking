// users list
var users = [
  { name: "Rahul", email: "rahul@test.com", password: "rahul123" },
  { name: "Priya", email: "priya@test.com", password: "priya123" },
];

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var error = document.getElementById("error");

  if (email == "" || password == "") {
    error.innerHTML = "Please fill all the fields";
    return;
  }

  var found = false;

  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      found = true;
      localStorage.setItem("user", users[i].name);
    }
  }

  if (found == true) {
    window.location = "booking.html";
  } else {
    error.innerHTML = "Email or password is wrong";
  }
}
