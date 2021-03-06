app.controller('controller_shop', function ($scope, $window, $rootScope, $route, filters, list_products, services_shop) {

    $scope.load_details = function () {
        location.href = "#/product/" + this.product.ID;
    };

    let path = $route.current.originalPath.split('/');

    if (path[1] === 'shop') {
        $scope.filters = filters;
        $scope.show_list_product = true;
        $scope.show_details = false;

        var local = localStorage.getItem('filters');

        if (local.length > 3) {
            local = JSON.parse(local);
            services_shop.load_with_filters(local);
        }

        else {
            services_shop.addMap(list_products);
            services_shop.load(list_products);
            services_shop.load_favs();
        }

    } else if (path[1] === 'product') {
        $scope.show_list_product = false;
        $scope.show_details = true;

        services_shop.details($route.current.params.id);
        setTimeout(load_slider, 50); // con menos de 50 falla de vez en cuando
    }

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


    $scope.save_filters = function (filters) {
        services_shop.save_filters(filters);
        location.reload();
    };

    $scope.delete_filters = function () {
        localStorage.setItem('filters', '');
        location.reload();
    };

    $scope.add_favs = function () {
        if (localStorage.token) {
            if (this.product.like == "fa-heart") {
                services_shop.UpdateLikes(this.product.ID, localStorage.token, 'dislike');
                this.product.like = "fa-heart-o";
            } else {
                services_shop.UpdateLikes(this.product.ID, localStorage.token, 'like');
                this.product.like = "fa-heart";
            }
        } else {
            location.href = "#/login";
        }
    }
});
