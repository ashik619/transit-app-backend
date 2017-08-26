var app = angular.module('busStopApp', []);
app.controller('busStopCtrl', function($scope, $http) {
    $http.get("127.0.0.1:8080/api/busstop/getBusStops")
    .then(function(response) {
        $scope.busStops = response.data;
    });
});