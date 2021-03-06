app.controller('controller_home', function($scope, $window, brands, categories, types) {

    
    $scope.categories = categories;
    $scope.types = types;
    $scope.brands = brands;

    setTimeout(load_slider, 50); // con menos de 50 falla de vez en cuando

    function load_slider() {
        new Glider(document.querySelector('.carousel__list'), {
            slidesToShow: 1,
            dots: '.carousel__indicator',
            draggable: false,
            arrows: {
                prev: '.carousel__prev',
                next: '.carousel__next'
            }
        });
    }

    $scope.redirect_shop = function (filter_type, filter) {
        
        let brand = [];
        let type = [];
        let category = [];
        let filters = [];

        
        switch (filter_type) {
            case 'brand':
                brand.push(filter);
                filters.push({ "brand": brand });
                break;
            case 'category':
                category.push(filter);
                filters.push({ "category": category });
                break;
            case 'type':
                type.push(filter);
                filters.push({ "type": type });
                break;
            default:
                break;
        }

        localStorage.setItem('filters', JSON.stringify(filters));

        location.href = "#/shop"
    }

})
    
    
    // let loaded = 3;
    // let total = brands.length;
    
    

    // $scope.slides = carousel;
    // console.log(category);
    // $scope.categories = category;
    // $scope.brands = brands.slice(0, loaded);



    // window.addEventListener('load', function(){
    //   new Glider(document.querySelector('.carousel__list'),{ 
    //       slidesToShow: 1,
    //       dots: '.carousel__indicator',
    //       draggable: true,
    //       arrows: {
    //           prev: '.carousel__prev',
    //           next: '.carousel__next'
    //       }
    //   });
    // });

    // angular.element($window).on('mousewheel', function() {
    //   let footerHeight = document.getElementById('container-footer').offsetHeight;
    //   let position = $window.scrollY + footerHeight;
    //   let bottom = document.body.scrollHeight - $window.innerHeight;

    //     if (position >= bottom) {
    //         if (loaded < total) {
    //             loaded += 3;
    //             $scope.brands = brands.slice(0,loaded);
    //             $scope.$apply();
    //         }else {
    //             angular.element($window).off('mousewheel');
    //         }
    //     }
    // });

    /*
      cont=3;
      $scope.slides = categories.slice(0,2);
      $scope.cats = categories.slice(0, cont);
  
      $scope.showMore = function() {
          cont=cont+3;
          $scope.cats = categories.slice(0, cont);
          if (cont>$scope.cats.length) {
              angular.element('#show_more').remove();
          }
  
      };
    */

    // $scope.redirect_shop = function(key, value) {
    //   var filters = [];
    //   filters.push({key:key, value:[value]});
    //   localStorage.removeItem('filters');
    //   localStorage.setItem('filters', JSON.stringify(filters)); 
    //   location.href = "#/shop";
    // };

