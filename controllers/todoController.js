const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://test:test@ds127958.mlab.com:27958/todo');

// create a schema (blueprint)
const todoSchema = new mongoose.Schema({
    item: String
});

let Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/todo', function(req, res){
        // get data from mongoDB and pass it to view
        Todo.find({}, function(err, data){
            if(err) {
                throw err;
            }
            res.render('todo', {todos: data});
        });
    });

    // use the body parser middleware to handle the post request
    app.post('/todo', urlencodedParser, function(req, res){
        // get data from the view and add it to mongoDB
        Todo(req.body).save(function(err, data){
            if(err) {
                throw err;
            }
            res.json(data);
        });
    });    

    app.delete('/todo/:item', function(req, res){
        // delete the requested item from mongoDB
        Todo.find({item: req.params.item}).remove(function(err, data){
            if(err) {
                throw err;
            }
            res.json(data);        
        });
    });       

};