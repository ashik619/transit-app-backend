var app = angular.module('busStopApp', []);
    app.controller('busStopCtrl', function($scope, $http) {
    $scope.createNew = false;
    
      $http({
             method: 'GET',
             url : 'http://127.0.0.1:8080/api/busstop/getBusStops'}
        ).then(function(response) {
              $scope.busStops = response.data.data;
              $scope.content = "Success";
              }, function(response) {
                 $scope.content = "Something went wrong";
              }
            );
      $scope.createBusStop = function() {
          var reqBody = {
            method: "POST",
            url: "http://127.0.0.1:8080/api/busstop/createBusStop",
            headers: {
            'Content-Type': 'application/json'
            },
            data: { name: $scope.name,stopId : $scope.id,lat : $scope.lat,lng : $scope.lng }
            };
          $http(reqBody).then(function(response){
                  $scope.content = response.data.msg;
                }, function(response){
                    $scope.content = response.data.msg;
                });
  
      };
});