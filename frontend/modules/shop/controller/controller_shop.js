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
        // console.log(local.length);

        if (local.length > 3) {
            local = JSON.parse(local);
            services_shop.load_with_filters(local);
        }

        else {
            $scope.products = list_products;
            services_shop.addMap(list_products);

            // $scope.pagination(list_products);
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




    // $scope.add_cart = function(codigo_producto) {
    //     if(localStorage.token){
    //         services_shop.add_cart(codigo_producto, localStorage.token);
    //     }else{
    //         location.href = "#/login";
    //     }
    // }

    // $scope.add_favs = function() {
    //     if(localStorage.token){
    //         services_shop.add_favs(this.product.codigo_producto, localStorage.token);
    //         if(this.product.favs_class == "bxs-heart"){
    //             this.product.favs_class = "bx-heart";
    //         }else{
    //             this.product.favs_class = "bxs-heart";
    //         }
    //     }else{
    //         location.href = "#/login";
    //     }
    // }

    // let path = $route.current.originalPath.split('/');
    // if(path[1] === 'shop'){
    //     $scope.filters = filters;
    //     $scope.show_list_product = true;
    //     $scope.show_details = false;
    //     if(localStorage.filters){
    //         var local = JSON.parse(localStorage.filters);
    //         localStorage.removeItem('filters');
    //         services_shop.filter_search(local);
    //     }else{
    //         $scope.pagination(list_products);
    //     }
    // }else if(path[1] === 'product'){
    //     $scope.show_list_product = false;
    //     $scope.show_details = true;
    //     services_shop.details($route.current.params.token);
    // }
});
