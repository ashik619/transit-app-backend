var app = angular.module('routeApp', []);
    app.controller('routeCtrl', function($scope, $http) {
    $scope.createNew = false;
    $http({
             method: 'GET',
             url : 'http://127.0.0.1:8080/api/route/getRoutes'}
        ).then(function(response) {
              $scope.routes = response.data.data;
              $scope.content = "Success";
              }, function(response) {
                 $scope.content = "Something went wrong";
              }
        );
    $http({
            method: 'GET',
            url : 'http://127.0.0.1:8080/api/busstop/getBusStops'})
        .then(function(response) {
              $scope.busStops = response.data.data;
              $scope.content = "Success2";
              }, function(response) {
                 $scope.content = "Something went wrong";
              }
        );
        
    $http({
            method: 'GET',
            url : 'http://127.0.0.1:8080/api/route/getRouteBusStops'})
        .then(function(response) {
              $scope.busStops = response.data.data;
              $scope.content = "Success2";
              }, function(response) {
                 $scope.content = "Something went wrong";
              }
        );
        
    $scope.createRoute = function() {
          var reqBody = {
            method: "POST",
            url: "http://127.0.0.1:8080/api/route/createRoute",
            headers: {
            'Content-Type': 'application/json'
            },
            data: { name: $scope.name, routeId : $scope.id, srcName : $scope.startBusStop.name, srcBsId : $scope.startBusStop.id, dstName : $scope.lastBusStop.name, dstBsId : $scope.lastBusStop.id }
            };
          $http(reqBody).then(function(response){
                  $scope.content = response.data.msg;
                }, function(response){
                    $scope.content = response.data.msg;
                });
  
    };
    $scope.viewAllBusStops = function(id){
        $scope.showBusStops = true;
        $scope.createNew = false;
        var finalUrl = 'http://127.0.0.1:8080/api/route/getRouteBusStops?id=';
         $http({
            method: 'GET',
            url : finalUrl.concat(id)})
        .then(function(response) {
              $scope.routeBusStops = response.data.data;
              $scope.content = "Success3";
              }, function(response) {
                 $scope.content = "Something went wrong";
              }
        );
    };
});