var app = angular.module('busApp', []);
    app.controller('busCtrl', function($scope, $http, $window) {
    $scope.createNew = false;
    
      $http({
             method: 'GET',
             url : 'http://127.0.0.1:8080/api/bus/getAllBus'}
        ).then(function(response) {
              $scope.allBus = response.data.data;
              }, function(response) {
                 showMessage("Something went wrong");
              }
            );
      $http({
             method: 'GET',
             url : 'http://127.0.0.1:8080/api/route/getRoutes'}
        ).then(function(response) {
              $scope.routes = response.data.data;
              }, function(response) {
                showMessage("Some thing went wrong");
              }
        );
      $scope.addNewBus = function() {
          var reqBody = {
            method: "POST",
            url: "http://127.0.0.1:8080/api/bus/createBus",
            headers: {
            'Content-Type': 'application/json'
            },
            data: { name: $scope.name,busId : $scope.bid, routeId : $scope.selectedRoute.routeId }
            };
          $http(reqBody).then(function(response){
                  showMessage(response.data.msg);
                }, function(response){
                    console.log(response);
                    showMessage("Something went wrong");
                });
  
      };
      var showMessage = function(message){
         $window.alert(message);
    };
});