var user = localStorage.getItem("user");

// if not logged in go back to login page
if (user == null) {
  window.location = "login.html";
}

document.getElementById("welcome").innerHTML = "Welcome, " + user;

// get today's date like 2026-10-16
function getToday() {
  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return d.getFullYear() + "-" + month + "-" + day;
}

var dateInput = document.getElementById("date");
dateInput.value = getToday();
dateInput.min = getToday();

function getBookings() {
  var data = localStorage.getItem("bookings");
  if (data == null) {
    return {};
  }
  return JSON.parse(data);
}

function showSlots() {
  var date = dateInput.value;
  var bookings = getBookings();
  var currentHour = new Date().getHours();

  var html = "<tr><th>Time</th><th>Seats Left</th><th>Action</th></tr>";

  // gym open from 6 am to 10 pm
  for (var i = 6; i <= 21; i++) {
    var key = date + "_" + i;
    var people = bookings[key];

    if (people == undefined) {
      people = [];
    }

    var seatsLeft = 20 - people.length;
    var button = "";

    if (date == getToday() && i <= currentHour) {
      button = "<button disabled>Closed</button>";
    } else if (people.includes(user)) {
      button =
        "<button class='cancel' onclick=\"cancelSlot('" +
        key +
        "')\">Cancel</button>";
    } else if (seatsLeft == 0) {
      button = "<button disabled>Full</button>";
    } else {
      button = "<button onclick=\"bookSlot('" + key + "')\">Book</button>";
    }

    html += "<tr>";
    html += "<td>" + i + ":00 - " + (i + 1) + ":00</td>";
    html += "<td>" + seatsLeft + " / 20</td>";
    html += "<td>" + button + "</td>";
    html += "</tr>";
  }

  document.getElementById("slotTable").innerHTML = html;
}

function bookSlot(key) {
  var bookings = getBookings();

  if (bookings[key] == undefined) {
    bookings[key] = [];
  }

  if (bookings[key].length >= 20) {
    alert("Sorry this slot is full");
    return;
  }

  bookings[key].push(user);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Slot booked successfully!");
  showSlots();
}

function cancelSlot(key) {
  var bookings = getBookings();
  var newList = [];

  for (var i = 0; i < bookings[key].length; i++) {
    if (bookings[key][i] != user) {
      newList.push(bookings[key][i]);
    }
  }

  bookings[key] = newList;
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Booking cancelled");
  showSlots();
}

function logout() {
  localStorage.removeItem("user");
  window.location = "login.html";
}

showSlots();
