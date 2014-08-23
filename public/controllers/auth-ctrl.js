
todo.controller("authCtrl", function ($scope, $location, $window, UserService, AuthService) {

    $scope.login = function(username, password){

        if (username !== undefined && password !== undefined) {

            UserService.logIn(username, password).success(function(data) {
                AuthService.isLogged = true;
                $window.sessionStorage.token = data.token;
                $location.path("/");
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }
    };

    $scope.logout = function(){
        if (AuthService.isLogged) {
            AuthService.isLogged = false;
            delete $window.sessionStorage.token;
            $location.path("/");
        }
    };

});
