var app = angular.module('homeApp', []);
const baseUrl = 'http://34.208.166.249:80';
//const baseUrl = 'http://127.0.0.1:80';
    app.controller('homeCtrl', function($scope, $http, $window) {

      $http({
             method: 'GET',
             url : baseUrl+'/api/bus/getAllBus'}
        ).then(function(response) {
              $scope.buses = response.data.data.length;
              }, function(response) {
                 showMessage("Something went wrong");
              }
            );
      $http({
             method: 'GET',
             url : baseUrl+'/api/owner/getOwners'}
        ).then(function(response) {
              $scope.owners = response.data.data.length;
              }, function(response) {
                showMessage("Some thing went wrong");
              }
        );
        $http({
               method: 'GET',
               url : baseUrl+'/api/route/getRoutes'}
          ).then(function(response) {
                $scope.routes = response.data.data.length;
                }, function(response) {
                  showMessage("Some thing went wrong");
                }
          );
        $http({
                 method: 'GET',
                 url : baseUrl+'/api/busStop/getBusStops'}
            ).then(function(response) {
                  $scope.busstops = response.data.data.length;
                  }, function(response) {
                    showMessage("Some thing went wrong");
                  }
            );
        $http({
                   method: 'GET',
                   url : baseUrl+'/api/driver/getAllDrivers'}
              ).then(function(response) {
                    $scope.drivers = response.data.data.length;
                    }, function(response) {
                      showMessage("Some thing went wrong");
                    }
              );

      var showMessage = function(message){
         $window.alert(message);
    };
});
