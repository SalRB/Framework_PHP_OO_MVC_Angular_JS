var app = angular.module('Framework_PHP_OO_MVC_ANGULAR_JS', ['ngRoute', 'toastr']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "frontend/modules/home/view/home.html",
            controller: "controller_home",
            resolve: {
                brands: function (services) {
                    return services.get('home', 'HomeBrands');
                },
                categories: function (services) {
                    return services.get('home', 'HomeCategories');
                },
                types: function (services) {
                    return services.get('home', 'HomeTypes');
                }
            }
        }).when("/shop", {
            templateUrl: "frontend/modules/shop/view/shop.html",
            controller: "controller_shop",
            resolve: {
                filters: function (services) {
                    return services.get('shop', 'FiltersContent');
                },
                list_products: function (services) {
                    return services.get('shop', 'AllCars');
                }
            }
        }).when("/product/:id", {
            templateUrl: "frontend/modules/shop/view/shop.html",
            controller: "controller_shop",
            resolve: {
                filters: function () { },
                list_products: function () { }
            }
        }).when("/contact", {
            templateUrl: "frontend/modules/contact/view/contact.html",
            controller: "controller_contact"
        }).when("/login", {
            templateUrl: "frontend/modules/login/view/login.html",
            controller: "controller_login"
        }).when("/logout", {
            templateUrl: "frontend/modules/login/view/login.html",
            controller: "controller_login"
        }).when("/register", {
            templateUrl: "frontend/modules/login/view/login.html",
            controller: "controller_login"
        }).when("/verify/:token", {
            templateUrl: "frontend/modules/login/view/login.html",
            controller: "controller_login"
        }).when("/recover", {
            templateUrl: "frontend/modules/login/view/login.html",
            controller: "controller_login"
        }).when("/recover/:token", {
            templateUrl: "frontend/modules/login/view/login.html",
            controller: "controller_login"
            // }).when("/cart", {
            //     templateUrl: "frontend/modules/cart/view/cart.html", 
            //     controller: "controller_cart",
            //     resolve: {
            //         list_products: function (services) {
            //             return services.post('cart', 'load_cart', {token: localStorage.token});
            //         }
            //     }
        }).otherwise("/home", {
            templateUrl: "frontend/modules/home/view/home.html",
            controller: "controller_home",
            resolve: {
                carousel: function (services) {
                    return services.get('home', 'carousel');
                },
                categoria: function (services) {
                    return services.get('home', 'categoria');
                },
                brands: function (services) {
                    return services.get('home', 'brands');
                }
            }
        });
}]);

app.run(function ($rootScope, services, services_search) {

    services_search.search_category();
    services_search.search_brand();

    $rootScope.change_brand = function (category) {
        services_search.search_brand(category);
    }

    $rootScope.change_cities = function (category, brand, city) {
        services_search.search_cities(category, brand, city);
    }

    $rootScope.search = function (category, brand, city) {
        services_search.search(category, brand, city);
    }

});

