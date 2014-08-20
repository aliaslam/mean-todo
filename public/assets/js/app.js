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


todo.controller("listCtrl", function ($scope, $filter, List) {

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

    $scope.delete = function(listToDel){
        listToDel.$delete(function(res){
            if(res.message == 'deleted'){
                $scope.lists = $scope.lists.filter(function(list){
                    return list._id !== listToDel._id;
                });
            }
        });
    };

    $scope.update = function(list){
        list.$update();
    };

    $scope.sortableOptions = {
        //disabled: true,
        placeholder: "task-placeholder-highlight",
        stop: function(e, ui) {
            var lists = ui.item.scope().lists;
            var list_len = lists.length;
            for (i = 0; i < list_len; i++) {
                lists[i].display_order = i;
                lists[i].$update();
            }
        }
    };

    $scope.addTask = function(newTask, list){
        list.tasks.unshift({title: newTask, completed:false});
        list.newTask = '';
        list.$update(function(updatedList){
            list.tasks = updatedList.tasks;
        });
    };

    $scope.deleteTask = function(taskToDelete, list){
        list.tasks = list.tasks.filter(function(task){
            return (task._id !== taskToDelete._id);
        });
        list.$update();
    };

    $scope.markDone = function(task, list){
        task.completed = true;
        list.$update();
    };

    $scope.markUndone = function(task, list){
        task.completed = false;
        list.$update();
    };

});
