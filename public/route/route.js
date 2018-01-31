var app = angular.module('routeApp', []);
const baseUrl = 'http://34.208.166.249:80';
//var url = 'http://127.0.0.1:8080';
    app.controller('routeCtrl', function($scope, $http, $window) {
    $scope.createNew = false;
    $http({
             method: 'GET',
             url : baseUrl+'/api/route/getRoutes'}
        ).then(function(response) {
              $scope.routes = response.data.data;
              $scope.content = "Success";
              }, function(response) {
                showMessage("Some thing went wrong");
              }
        );
    $http({
            method: 'GET',
            url : baseUrl+'/api/busstop/getBusStops'})
        .then(function(response) {
              $scope.busStops = response.data.data;
              }, function(response) {
                 showMessage("Some thing went wrong");
              }
        );

    $scope.createRoute = function() {
         if($scope.name  && $scope.startBusStop && $scope.lastBusStop){
                  $scope.showBusStops = false;
                   var reqBody = {
                     method: "POST",
                     url: baseUrl+"/api/route/createRoute",
                     headers: {
                     'Content-Type': 'application/json'
                     },
                     data: { name: $scope.name, srcName : $scope.startBusStop.name, srcBsId : $scope.startBusStop.id, dstName : $scope.lastBusStop.name, dstBsId : $scope.lastBusStop.id }
                     };
                   $http(reqBody).then(function(response){
                           $scope.content = response.data.msg;
                         }, function(response){
                             $scope.content = response.data.msg;
                         });
         } else showMessage("Fill all fields");

    };
    $scope.viewAllBusStops = function(id){
         $scope.selectedRouteId = id;
        $scope.showBusStops = true;
        $scope.createNew = false;
        var finalUrl = baseUrl+'/api/route/getRouteBusStops?id=';
         $http({
            method: 'GET',
            url : finalUrl.concat(id)})
        .then(function(response) {
              $scope.routeBusStops = response.data.data;
              }, function(response) {
                 $scope.content = "Something went wrong";
              }
        );
    };
    $scope.addNewBusStop = function(){
        if($scope.selectedBusStop){
            var reqBody = {
            method: "POST",
            url: baseUrl+"/api/route/addBustop",
            headers: {
            'Content-Type': 'application/json'
            },
            data: { id : $scope.selectedRouteId, bsId : $scope.selectedBusStop.stopId}
            };
          $http(reqBody).then(function(response){
                  if(response.data.msg==200){
                           showMessage("Bus Stop Added");
                  }else showMessage("Some thing went wrong");
                }, function(response){
                    showMessage("Some thing went wrong");
                });
        }else showMessage("Select Bus Stop");
    };
    var showMessage = function(message){
         $window.alert(message);
    };
});
