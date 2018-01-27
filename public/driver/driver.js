var app = angular.module('busApp', []);
const baseUrl = 'http://34.208.166.249:80';
//const baseUrl = 'http://127.0.0.1:8080';
    app.controller('busCtrl', function($scope, $http, $window) {
    $scope.createNew = false;

      $http({
             method: 'GET',
             url : baseUrl + '/api/driver/getAllDrivers'}
        ).then(function(response) {
              $scope.drivers = response.data.data;
              }, function(response) {
                 showMessage("Something went wrong");
              }
            );
      $http({
             method: 'GET',
             url : baseUrl + '/api/owner/getOwners'}
        ).then(function(response) {
              $scope.owners = response.data.data;
              }, function(response) {
                showMessage("Some thing went wrong");
              }
        );
      $scope.addNewDriver = function() {
          var reqBody = {
            method: "POST",
            url: baseUrl + "/api/driver/createDriver",
            headers: {
            'Content-Type': 'application/json'
            },
            data: { name: $scope.name, phoneNumber : $scope.phoneNumber,   }
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
