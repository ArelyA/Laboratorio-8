// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables (DATA)
// =============================================================
var tables = [
    {
      name: "Yoda",
      phone: "11111111",
      email: "yoda@.mail.com",
      id: "1"
    },
    {
      name: "Darth Maul",
      phone: "22222222",
      email: "darthmaul@mail.com",
      id: "2"
    },
    {
      name: "Obi Wan Kenobi",
      phone: "33333333",
      email: "obiwan@mail.com",
      id: "3"
    }
  ];

// waitlist (DATA)
// =============================================================
var waitlist = [
    {
      name: "Yoda",
      phone: "44444444",
      email: "yoda@.mail.com",
      id: "4"
    },
    {
      name: "Darth Maul",
      phone: "55555555",
      email: "darthmaul@mail.com",
      id: "5"
    },
    {
      name: "Obi Wan Kenobi",
      phone: "66666666",
      email: "obiwan@mail.com",
      id: "6"
    }
  ];

// Contador
// =============================================================
var count = 0;
  
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Pemail
app.get("/", function(req, res) {
    count = count + 1;
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    count = count + 1;
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    count = count + 1;
    res.sendFile(path.join(__dirname, "reserve.html"));
});


// Displays all tables
app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

// Displays all waitlist
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

// Create New Reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
    var newReservation = req.body;

    if(tables.length < 5) {
        tables.push(newReservation);
        return res.json(newReservation);
    } else {
        waitlist.push(newReservation);
        return res.json(null);
    }
    
});

// Displays all tables
app.post("/api/check", function(req, res) {
    var index = tables.findIndex(function(item) {
        return item.id === req.body.id
    });
    tables.splice(index, 1);
    if(waitlist.length > 0) {
        tables.push(waitlist.shift());
    }
    
});

// Displays all waitlist
app.post("/api/clear", function(req, res) {
    waitlist = [];
    tables = [];
});

// Displays views
app.get("/api/views", function(req, res) {
    return res.json(count);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});