const express = require("express");
const hbs     = require('hbs');
const fs      = require('fs')

//git test

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get("/about", (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About this page',
    welcomeMessage: 'Welcome to the about page for today',
    currentYear: new Date().getFullYear()
  });
});

app.get("/about", (req, res) => {
  res.send('<h1 style = "color:red;">About page</h1>');
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to Handle request"
  });
});

app.get("/jason", (req, res) => {
  res.send({
    Location: "Jamaica",
    Name: "Jason guy",
    Message: "I am a jason guy"
  });
});

app.get("/hot", (req, res) => {
  res.send('<h1 style = "color:red;">Mans not hot</h1>');
});


var port = 3000;

app.listen(port, () => {
  console.log("Listening on port", port);
});
