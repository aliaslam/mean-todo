angular.module('todo.services',[]).factory('List',function($resource){
    return $resource('http://localhost:4000/api/lists/:id',{id:'@_id'}, {
        get: {method: 'GET', isArray: false },
        update: {method: 'PUT'}
        });
});


/*
angular.module('todo.services',[]).factory('UserService', function($http){
   return{
        login: function(username, password){

        },

        logout: function(){

        }

   }
});



angular.module('todo.services',[]).factory('AuthService',function(){
    var auth = {auth: false};
    return auth;
});
*/
