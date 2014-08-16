var todo = angular.module("todo", ['ngRoute', 'ngResource', 'xeditable', 'todo.services', 'ui.sortable', 'ui.bootstrap']);

todo.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});

todo.config(function($routeProvider){
    $routeProvider.
        when('/lists', {
            templateUrl: 'lists.html',
            controller: 'listCtrl'
        }).
        when('/lists/:id', {
            templateUrl: 'tasks.html',
            controller: 'taskCtrl'
        }).
        otherwise('/', {
            redirectTo: '/'
        });
});


todo.controller("listCtrl", function ($scope, List) {



    $scope.init = function(){
        $scope.lists = List.query();
    };

    $scope.addList  = function(newList){
        var list = new List();
        list.title = newList;
        list.$save(function(newReturnedList){
            $scope.lists.unshift(newReturnedList);
        });
        $scope.newList = '';
    };


    $scope.update = function(list){
        list.$update();
    };

    $scope.delete = function(listToDel){
        listToDel.$delete(function(res){
            if(res.message == 'deleted'){
                $scope.lists = $scope.lists.filter(function(list){
                    return list._id !== listToDel._id;
                });
            }
        });
    };

    $scope.sortableOptions = {
        //disabled: true,

        stop: function(e, ui) {
            var lists = ui.item.scope().lists;
            var list_len = lists.length;
            for (i = 0; i < list_len; i++) {
                lists[i].display_order = i;
                lists[i].$update();
            }
        }
    };

});

/*
todo.controller("taskCtrl", function($scope, List, $routeParams){

    $scope.init = function() {
        $scope.list = List.get({id:$routeParams.id});

        $scope.list.$promise.then(function(list) {
            $scope.list = list;
            $scope.title = list.title;
            var tasks = list.tasks;

            $scope.completedTasks = [];
            $scope.uncompletedTasks = [];
            for (var i in tasks) {
                if (tasks[i].completed == true) {
                    $scope.completedTasks.push(tasks[i]);
                }
                else{
                    $scope.uncompletedTasks.push(tasks[i]);
                }

            }
        });
    };


    $scope.addTask = function(newTask){
        $scope.list.tasks.push({title: newTask, completed:false});
        $scope.list.$update(function(){
            $scope.newTask = '';
            $scope.init();
        });
    };

    $scope.deleteTask = function(id){

        var tasks = $scope.list.tasks;
        for (var i in tasks) {
            if (tasks[i]._id == id) {
                $scope.list.tasks.splice(i, 1);
                break ;
            }
        }

        $scope.list.$update(function(){
            $scope.init();
        });
    };

    $scope.markDone = function(id){
        var tasks = $scope.list.tasks;
        for (var i in tasks) {
            if (tasks[i]._id == id) {
                tasks[i].completed = true;
                break ;
            }
        }

        $scope.list.$update(function(){
            $scope.init();
        });
    };

});
*/