(function() {
  var app = angular.module('MysiteApp', ['ngRoute', 'MyDirectives', 'ngAnimate', 'ngMaterial']);
  
  app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $http) {

    $scope.toggleLeft = buildToggler('left');
    $scope.boolChangeClass = true;
    $scope.isSidenavOpen = false;
    $scope.currentcomic = 0;
    $scope.comics = [];

    $scope.$watch('isSidenavOpen', function(isSidenavOpen) {
      $scope.boolChangeClass = !$scope.boolChangeClass;
    });

    // grabs content from data.json file
    $http.get('src/data.json').success(function(data) {
      $scope.comics = data;
    });

    function buildToggler(navID) {
      var debounceFn = $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },300);
      return debounceFn;
    }

    $scope.selectComic = function(setComic) {
      $scope.currentcomic = setComic;
      $log.debug($scope.currentcomic);
    };
 
    $scope.isSelected = function(checkComic) {
      return $scope.currentcomic === checkComic;
    };
  });

  app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  });
})();