
angular.module('todo', []).config(function($routeProvider){
    $routeProvider.
        when('/lists', {
            templateUrl: 'lists.html',
            controller: 'listCtrl'
        }).
        when('/lists/:list_id', {
            templateUrl: 'tasks.html',
            controller: 'listCtrl'
        }).
        otherwise('/', {
            redirectTo: '/'
        });
});
