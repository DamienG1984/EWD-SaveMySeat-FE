
 var SaveMySeatApp = angular.module('SaveMySeatApp', ['ngRoute'])

    SaveMySeatApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/rests', {
            templateUrl: 'partials/Main.html',
            //controller: 'ResturantController'
          })
          .when('/rests/:rest_id/Reviews',
          {
              templateUrl: './partials/Reviews.html',
              controller: 'ReviewsController'
          })
          .when('/rests/:rest_id/Bookings',
          {
              templateUrl: './partials/Bookings.html',
              controller: 'BookingsController'
          })
          .when('/partials/Resturants.html',
          {
              templateUrl: 'partials/Resturants.html',
              controller: 'ResturantController'
          })
          .when('/partials/AddResturant.html',
          {
              templateUrl: 'partials/AddResturant.html',
              controller: 'ResturantController'
          })
          .otherwise({
            redirectTo: '/rests'
          })
      }])

    SaveMySeatApp.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
})

    SaveMySeatApp.controller('ResturantController', ['$scope', 'RestService',function($scope,RestService) {
              $scope.rests = RestService.getrests()   // CHANGE
          
                $scope.incrementUpvotes = function(rest) 
                {
                   rest.upvotes += 1;
                 }// End of incrementUpvotes

                 $scope.incrementdownvotes = function(rest) 
                {
                   rest.downvotes += 1;
                 }// End of incrementdownvotes

                 $scope.addrest = function(){
          var new_id = 1 + $scope.rests[$scope.rests.length - 1].id
          $scope.rests.push({
            RestName: $scope.newrest.RestName,
            id: new_id,
            Address: $scope.newrest.Address,
            RestInfo: $scope.newrest.RestInfo,
            Cuisine: $scope.newrest.Cuisine,
            username : $scope.newrest.username,
            reviews : [],
            upvotes: 0,
            downvotes: 0,
            Spaces: $scope.newrest.tables

          })
          $scope.newrest = { };
         window.location = 'http://localhost:8080/SaveMySeat/SaveMySeatApp/#/partials/Resturants.html'; // Redirect to Resturant list after Resturant has been added
        } // End of addrest
    }]) 

SaveMySeatApp.controller('ReviewsController', ['$scope',
       'RestService', 
       '$routeParams',
       function ($scope,RestService ,$routeParams) {
             $scope.rest = RestService.getrest($routeParams.rest_id)
             $scope.incrementUpvotes = function(review) {
                  review.upvotes += 1;
             }
             $scope.incrementdownvotes = function(review) {
                  review.downvotes += 1;
             }
             $scope.addreview = function(){
                $scope.rest.reviews.push({
                  body: $scope.review.body,
                  author: $scope.review.author ,
                  upvotes: 0,
                  downvotes: 0
                })
                $scope.review = {} ;
              }
        }])

  

SaveMySeatApp.controller('BookingsController', ['$scope',
       'RestService', 
       '$routeParams',
       function ($scope,RestService ,$routeParams) {
             $scope.rest = RestService.getrest($routeParams.rest_id)
            $scope.addBooking = function(){
                $scope.rest.bookings.push({
                  date: $scope.book.date,
                  times: $scope.book.times,
                  Name: $scope.book.Name,
                  Email: $scope.book.Email,
                  People: $scope.book.People
                }
                )
                if ($scope.book.People < 5)
                {
                 $scope.rest.Spaces -= 1; 
                } else
                {
                  $scope.rest.Spaces -= 2;  
                }
                $scope.book = {};
              }
        }])

 SaveMySeatApp.factory('RestService', [function(){
         var rests = [ 
                { 
                    RestName : 'Indian Delights',
                    id : 1,
                    Address : 'Main Street Waterford',
                    RestInfo: "We are the number 1 Indian Resturants in Waterford providing the finest Indian Cuisine for the last 15 years",
                    Cuisine: 'Indian',
                    username : 'jbloggs',
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                                    }
                                ],
                    Spaces: 48,
                    reviews : [
                        {
                         body: ' . . . . my review . . . ',
                         author: 'jbloggs', 
                         upvotes: 2,
                         downvotes: 1 
                     } 
                     ],
                    upvotes : 10,
                    downvotes: 2
                  },
                 { 
                    RestName : 'Pizza World',
                    id : 2,
                    Address : 'Yellow Road Waterford',
                    RestInfo: "You wont find a better Pizzierea in Ireland, Friendly Atmosphere and excellent value",
                    Cuisine: 'Pizza',
                    username : 'notme',
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                     }
                                ],
                    Spaces: 55,
                    reviews : [
                                  {
                                     body: ' Great Atmosphere and Friendly Staff',
                                     author: 'jbloggs', 
                                     upvotes: 2,
                                     downvotes: 1  
                     }
                                ],
                    upvotes : 12,
                    downvotes: 2
                  },
                  { 
                    RestName : 'Momma Mia',
                    id : 3,
                    Address : 'Ardkeen Waterford',
                    RestInfo: "We are a loocal family run business. Enjoy Award winning service with live music Thursday - Sunday",
                    Cuisine: 'Italian',
                    username : 'notme',
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                     }
                                ],
                    Spaces: 30,
                    reviews : [{
                                     body: ' The Steak was amazing, deffinately going back ',
                                     author: 'jbloggs', 
                                     upvotes: 2,
                                     downvotes: 1  
                     }],
                    upvotes : 15,
                    downvotes: 2
                  },
                  { 
                    RestName : 'Happy Days',
                    id : 4,
                    Address : 'Dunmore Road Waterford',
                    RestInfo: "Come and enjoy our traditional Chinese food. Excellent value and special offers 7 Days a week",
                    Cuisine: 'Chinese',
                    username : 'psmith',  
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                     }
                                ],
                    Spaces: 10,
                    reviews : [{
                                     body: ' . . . . my review . . . ',
                                     author: 'jbloggs', 
                                     upvotes: 2,
                                     downvotes: 1  
                     }],
                    upvotes : 2,
                    downvotes: 0
                  },
                  { 
                    RestName : 'Happy Belly',
                    id : 5,
                    Address : 'Main Street Kilkenny',
                    RestInfo: "Excellent Value and get rates on partys. 2015 best Oriential Resturant in Ireland Winner",
                    Cuisine: 'Chinese',
                    username : 'psmith',  
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                     }
                                ],
                    Spaces: 60,
                    reviews : [{
                                     body: ' . . . . my review . . . ',
                                     author: 'jbloggs', 
                                     upvotes: 2,
                                     downvotes: 1  
                     }],
                    upvotes : 2,
                    downvotes: 2
                  },
                  { 
                    RestName : 'Ou LA LA',
                    id : 6,
                    Address : 'Main Street Dublin',
                    RestInfo: "Excellent Value and get rates on partys. 2015 best Resturant in Ireland Winner",
                    Cuisine: 'French',
                    username : 'psmith',  
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                     }
                                ],
                    Spaces: 15,
                    reviews : [{
                                     body: ' . . . . my review . . . ',
                                     author: 'jbloggs', 
                                     upvotes: 2,
                                     downvotes: 1  
                     }],
                    upvotes : 2,
                    downvotes: 2
                  }
                ]

         var api = {
             getrests : function() {
                return rests
             },
             getrest : function(id) {
                var result = null
                rests.forEach(function(rest){
                   if (rest.id == id) {
                      result  = rest
                    }
                } )
                return result
             }
          }
          return api
        }])