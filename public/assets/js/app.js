var todo = angular.module("todo", ['ngRoute', 'ngResource', 'xeditable', 'todo.services', 'ui.sortable', 'ui.bootstrap', 'ngAnimate']);

todo.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});

todo.config(function($routeProvider){
    $routeProvider.
        when('/lists', {
            templateUrl: 'lists.html',
            controller: 'listCtrl'
        }).
        otherwise('/', {
            redirectTo: '/'
        });
});