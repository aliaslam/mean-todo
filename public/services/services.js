angular.module('todo.services',[]).factory('List',function($resource){
    return $resource('http://localhost:4000/api/lists/:id',{id:'@_id'}, {
        get: {method: 'GET', isArray: false },
        update: {method: 'PUT'}
        });
});

