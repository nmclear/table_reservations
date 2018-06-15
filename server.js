// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Reservations and Waiting List Data
// =============================================================
var reservations = [
    {
      name: 'Nick Clear',
      phone: 1234567890,
      email: 'nickclear22@gmail.com',
      uniqueID: 'nmclear'
    }
];

var waitList = [
    {
        name: 'Bob Burger',
        phone: 1234567890,
        email: 'burger@bob.com',
        uniqueID: 'burgerbob'
    }
];

// Routes
// ============================================================

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservations", function(req, res) {
    res.sendFile(path.join(__dirname, "form.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "views.html"));
});

app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitList);
});


function postReservations(){
    app.post("/api/reservations", function(req, res){
        var newReservation = req.body;
        if(reservations.length >= 5){
            waitList.push(newReservation);
            res.json(newReservation);
            return false;
        } else {
            reservations.push(newReservation);
            res.json(newReservation);
            return true;
        }
    });
}

postReservations();
// if(postListen){
//     alert('you made a reservation');
// } else {
//     alert('You are on the waiting list.')
// }



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});