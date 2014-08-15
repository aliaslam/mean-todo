var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');


router.route('/lists')

    //Get all lists
    .get(function(req, res){
        Todo.aggregate([
                {$match:{ user_id : 'aaslam' }},
                { $sort : {display_order: 1 } },
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
        Todo.findOneAndUpdate(query, req.body, {}, function(err, list){
            if(err) res.send(err);
            console.log('saved');
            res.json({message: 'updated'});
        });
    })


/*    .put(function(req, res){
        console.log('here');
        Todo.findById(req.params.id, function(err, list){
            if(err) res.send(err);

            for(prop in req.body){
                list[prop]=req.body[prop];
            }

            list.save(function(err){
                if(err) res.send(err);
                //res.json({message: 'updated'});
                res.json(list);
            });
        });
    })*/

    //Delete a specific list by id
    .delete(function(req, res){
        Todo.remove({_id: req.params.id}, function(err, list){
            if(err) res.send(err);
            res.json({message: 'deleted'});
        });
    });

module.exports = router;
