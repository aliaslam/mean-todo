

angular.module('todo',[]).controller('listCtrl', [function($scope, $http, 'ListService'){
    ListService.getLists().success(function(lists){
        $scope.lists = lists;
    });

}]);