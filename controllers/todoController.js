var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});

//connect to database
mongoose.connect('mongodb://test:test@ds243768.mlab.com:43768/mukulpatlan-todo');

//create schema -  this is like a blueprint
var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){
    app.get('/todo', (req, res) => {
        //get data from mongodb and pass it to view
        Todo.find({}, (err, data)=>{
            if(err)
                throw err;
            res.render('todo', {todos: data});
        });
    });
    app.post('/todo',urlencodedParser, (req, res) => {
        //get data from the param and add it to mongodb
        var newTodo = Todo(req.body).save((err, data)=>{
            if(err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', (req, res) => {
        //deleted the requested item from mongodb
        Todo.find({item : req.params.item.replace(/\-/g, ' ')}).remove((err, data) =>{
            if(err) throw err;
            res.json(data);
        })
    });
};