var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//template engine
app.set('view engine', 'ejs');

//middleware for static file
app.use(express.static('./public'));

//fire controller
todoController(app);

//listen to port
app.listen(3000);
console.log("listening to port 3000");