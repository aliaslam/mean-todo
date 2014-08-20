var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');


function fetchLists(match, fetchOne, callback){
    Todo.aggregate([
            {$match: match},
            { $sort : {display_order: 1 } },
            {$project: {
                title: 1,
                updated_at: 1,
                tasks: 1,
                display_order: 1,
                total_tasks:{$size:"$tasks"}
            }}
        ] , function(err, data){
                if(err) res.send(err);
                if(fetchOne) data = data[0];
            callback(data);
        }
    );
}


router.route('/lists')

    //Get all lists
    .get(function(req, res){
        fetchLists({ user_id : 'aaslam' }, false, function(data){
            res.json(data);
        });
    })

    //Add a new list
    .post(function(req, res) {
        var todo = new Todo(req.body);
        todo.user_id = "aaslam"; //todo: fetch the username from the session
        todo.save(function (err, list) {
            if (err) res.send(err);
            res.json(list);
        });
    });


router.route('/lists/:id')
    //Get 1 specific list by id
    .get(function(req, res){
        Todo.findById(req.params.id, function(err, list){
            if(err) res.send(err);
            res.json(list);
        });
    })

    //Update a specific list by id

    .put(function(req, res){
        var query = { _id : req.params.id };
        Todo.findOneAndUpdate(query, req.body, function(err, list){
            if(err) res.send(err);
            fetchLists({ user_id : 'aaslam', _id : list._id }, true, function(data){
                res.json(data);
            });
        });
    })

    //Delete a specific list by id
    .delete(function(req, res){
        Todo.remove({_id: req.params.id}, function(err, list){
            if(err) res.send(err);
            res.json({message: 'deleted'});
        });
    });

module.exports = router;
