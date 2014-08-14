var todo = angular.module("todo", ['ngRoute', 'ngResource', 'xeditable', 'todo.services', 'ui.sortable']);

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

    $scope.list = new List();

    $scope.addList  = function(){
        $scope.list.$save(function(){
            $scope.lists = List.query();
            $scope.newList = '';

        });
    };


    $scope.sortableOptions = {
        activate: function() {
        },

        update: function(e, ui) {
            console.log(ui);


        },
        stop: function(e, ui) {
            console.log("stop");
        }
    };
/*

    app.loadTasks = function(list_id) {
        $http.get(url + "/lists/" + list_id).success(function (todoList) {
            app.todoList.title = todoList.title;
            app.todoList.tasks = todoList.tasks;
        });
    };

    function loadLists() {
        $http.get(url + '/lists' ).success(function (lists) {
            app.lists = lists;
        });
    }
    loadLists();
*/
});


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
