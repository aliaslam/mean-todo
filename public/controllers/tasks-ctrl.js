
angular.module('todo').controller('taskCtrl', ['$scope', '$http', function($scope, $http){

    var app = this;
    var url = "http://localhost:3000/api";

    function loadTasks(list_id) {
        $http.get(url + "/lists/" + list_id).success(function (todoList) {
            app.todoList.title = todoList.title;
            app.todoList.tasks = todoList.tasks;
        });
    }

}]);