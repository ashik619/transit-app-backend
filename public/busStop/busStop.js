var app = angular.module('busStopApp', []);
const baseUrl = 'http://34.208.166.249:80';
//const baseUrl = 'http://127.0.0.1:8080';
    app.controller('busStopCtrl', function($scope, $http, $window) {
    $scope.createNew = false;

      $http({
             method: 'GET',
             url : baseUrl + '/api/busstop/getBusStops'}
        ).then(function(response) {
              $scope.busStops = response.data.data;
              $scope.content = "Success";
              }, function(response) {
                 showMessage("Something went wrong");
              }
            );
      $scope.createBusStop = function() {
          var reqBody = {
            method: "POST",
            url: baseUrl + "/api/busstop/createBusStop",
            headers: {
            'Content-Type': 'application/json'
            },
            data: { name: $scope.name,lat : $scope.lat,lng : $scope.lng }
            };
          $http(reqBody).then(function(response){
                  showMessage(response.data.msg);
                }, function(response){
                    showMessage("Something went wrong");
                });

      };
      var showMessage = function(message){
         $window.alert(message);
    };
});
