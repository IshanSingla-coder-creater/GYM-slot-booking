# Gym Slot Booking

This is my gym slot booking app made using html, css and javascript.

Members can login and book a 1 hour slot in the gym. Each slot has only 20 seats so the gym doesn't get overbooked. You can also cancel your booking.

## How to run

Open the folder in terminal and run

npx serve -l 3000

then go to http://localhost:3000/login

## Login details

rahul@test.com / rahul123

priya@test.com / priya123

## Design note

I used plain html css and js because I'm still learning and wanted to keep it simple.
Users are saved in an array in login.js.
When you login, your name gets saved in localStorage.
Bookings are also saved in localStorage like this:
{ "2026-10-16_7": ["Rahul", "Priya"] }
The key is the date and the hour, and the value is the list of people who booked.
Seats left is 20 minus the number of people in the list.

## Assumptions

- gym is open from 6am to 10pm
- every slot is 1 hour
- you can't book a slot after it has started
- you can cancel any time before the slot starts

## What's not done yet

- there is no backend or database, everything is saved in the browser
- passwords are not hashed
- no register page, admin page, waitlist or check in code yet

I'm planning to add a node.js backend and a database next.
