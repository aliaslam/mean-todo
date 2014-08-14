//Setup

var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

//DB setup


var Todo = require('./models/todo');

mongoose.connect('mongodb://localhost/todo');


//Routing

/*
router.get('/addtestdata', function(req, res){
    var todo = new Todo();
    todo.user_id = "aaslam";
    todo.title = "perfumes";
    todo.save(function(err){
        if(err) res.send(err);
        res.json({message: todo.title + ' Added!'});
    });
});
*/

/*
app.use("/",function(req, res){
    console.log(req);
});
*/


router.route('/lists')

    //Get all lists
    .get(function(req, res){
        Todo.aggregate([
            {$match:{ user_id : 'aaslam' }},
            {$project: {
                title: 1,
                updated_at: 1,
                tasks: 1,
                total_tasks:{$size:"$tasks"}
            }}
        ] , function(err, lists){ //todo: fetch the username from the session
                if(err) res.send(err);
                res.json(lists);
            }
        );
    })

    //Add a new list
    .post(function(req, res) {
        var todo = new Todo(req.body);
        todo.user_id = "aaslam"; //todo: fetch the username from the session
        todo.save(function (err) {
            if (err){
                res.send(err)
            }
            else {
                res.send({message: 'Movie Added'});
            }
        });
    });


router.route('/lists/:id')

    //Get 1 specific list by list
    .get(function(req, res){
        Todo.findById(req.params.id, function(err, list){
            if(err) res.send(err);
            res.json(list);
        });
    })

    //Update a specific list by id
    .put(function(req, res){
        Todo.findById(req.params.id, function(err, list){
            if(err) res.send(err);

            for(prop in req.body){
                list[prop]=req.body[prop];
            }

            list.save(function(err){
                if(err) res.send(err);
                res.json({message: 'updated'});
            });
        });
    })

    //Delete a specific list by id
    .delete(function(req, res){
        Todo.remove({_id: req.params.list_id}, function(err, list){
            if(err) res.send(err);
            res.json({message: 'deleted'});
        });
    });




/*
get: /lists gets all the lists for the currett user
post


 */

//Start the server

app.use('/api', router);
var port = process.env.PORT || 4000;
app.listen(port);
