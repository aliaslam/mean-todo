

angular.module('todo',[]).controller('listCtrl', [function($scope, $http, 'ListService'){

    ListService.getLists().success(function(lists){
        $scope.lists = lists;
    });
/*
    $scope.addList  = function(newList){
        $http.post(url + "/lists", {title:app.newList}).success(function () {
            loadLists();
        });
        app.newList = '';
    };


    $scope.loadTasks = function(list_id) {
        $http.get(url + "/lists/" + list_id).success(function (todoList) {
            app.todoList.title = todoList.title;
            app.todoList.tasks = todoList.tasks;
        });
    };

    function loadLists() {

    }
    loadLists();
*/
}]);