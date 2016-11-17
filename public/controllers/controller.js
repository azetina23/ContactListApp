var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("Hello World fom controller");

  // $http.get('/contactlist');

  var refresh = function() {
      $http.get('/contactlist').success(function(response) {
        console.log("Got Data: ");
        $scope.contactlist = response;
      });
  };
  refresh();

  $scope.addContact = function() {
    $http.post('/contactlist', $scope.contact).success(function(response) {
      console.log(response);
      refresh();
    });
  };

  $scope.remove = function(id) {
    console.log(id);
    $http.delete('/contactlist/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/contactlist/' + id).success(function(response) {
      $scope.contact = response;
    });
  };

  $scope.update = function() {
    console.log($scope.contact._id);
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(fuction(response) {
      refresh();
    });
  };

  $scope.deselect = function() {
    $scope.contact = "";
  };

  // person1 = {
  //   name:"Rick",
  //   email:"rick@roll.com",
  //   number:"111-111-1111"
  // };
  //
  // person2 = {
  //   name:"Bob",
  //   email:"bob@bill.com",
  //   number:"222-222-2222"
  // };
  //
  // person3 = {
  //   name:"Jill",
  //   email:"jilly@bean.com",
  //   number:"333-333-3333"
  // };
  //
  // var contactlist = [person1, person2, person3];
  //
  // $scope.contactlist = contactlist;

}]);
