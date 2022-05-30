app.factory('services_shop', ['services', '$rootScope', function (services, $rootScope) {
    let service = { details: details, load_api: load_api, load_with_filters: load_with_filters, pagination: pagination, change_page: change_page, add_favs: add_favs, save_filters: save_filters, addMap: addMap };
    return service;

    function pagination(products, favs) {
        $rootScope.products = products;
        $rootScope.page = 1;
        $rootScope.total_page = Math.ceil(products.length / 6);
        $rootScope.pages = [];
        for (i = 1; i <= $rootScope.total_page; i++) {
            $rootScope.pages.push(i);
        }
        // change_page($rootScope.page, favs);
    }

    function change_page(page, favs) {
        $rootScope.show1 = true;
        $rootScope.show2 = true;

        $rootScope.current_page = page;
        $rootScope.list_products = $rootScope.products.slice((($rootScope.current_page - 1) * 6), (($rootScope.current_page) * 6));
        if (page >= $rootScope.total_page) {
            $rootScope.show2 = false;
        }
        if (page <= 1) {
            $rootScope.show1 = false;
        }
        load_favs();
    }

    function load_favs() {
        if (localStorage.token) {
            services.post('shop', 'load_like', { user: localStorage.token })
                .then(function (response) {
                    for (row in $rootScope.list_products) {
                        $rootScope.list_products[row].favs_class = "bx-heart";
                        var product = $rootScope.list_products[row];
                        for (row in response) {
                            if (response[row].codigo_producto == product.codigo_producto) {
                                product.favs_class = "bxs-heart";
                            };
                        }
                        $rootScope.list_products[row].favs_class = product.favs_class;
                    }
                }, function (error) {
                    console.log(error);
                });
        } else {
            for (row in $rootScope.list_products) {
                $rootScope.list_products[row].favs_class = "bx-heart";
            }
        }
    }

    function details(id) {
        services.post('shop', 'ShopDetails', { id })
            .then(function (data) {
                console.log(data);
                $rootScope.products = data;
                // load_favs();
                // load_api();
            }, function (error) {
                console.log(error);
            });
    }

    function load_api() {
        services.get_api("https://www.googleapis.com/books/v1/volumes?q=subject:sneakers", 'GET', 'JSON')
            .then(function (result) {
                $rootScope.api_content = result;
            }, function () {
                console.log("error api");
            });
    }

    function add_favs(codigo_producto, user) {
        services.post('shop', 'click_like', { id: codigo_producto, user: user })
            .then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
    }

    function save_filters(filters) {
        let brand = [];
        let type = [];
        let category = [];
        let params = [];

        // angular.forEach(filters, function (value, key) {
        // });

        angular.forEach(filters.brand, function (value, key) {
            if (filters.brand[key].checked) {
                brand.push(filters.brand[key].brand);
            }
        });
        if (brand.length != 0) {
            params.push({ "brand": brand });
        }
        angular.forEach(filters.type, function (value, key) {
            if (filters.type[key].checked) {
                type.push(filters.type[key].type);
            }
        });
        if (type.length != 0) {
            params.push({ "type": type });
        }
        angular.forEach(filters.category, function (value, key) {
            if (filters.category[key].checked) {
                category.push(filters.category[key].category);
            }
        });
        if (category.length != 0) {
            params.push({ "category": category });
        }

        console.log(params);

        if (params.length > 0) {
            localStorage.setItem('filters', JSON.stringify(params));
        } else {
            localStorage.setItem('filters', '');
        }

    }

    function load_with_filters(params) {
        console.log(params);
        services.post('shop', 'Filters', { params })
            .then(function (response) {
                console.log(response);
                $rootScope.products = response;
                // pagination(response);
            }, function (error) {
                console.log(error);
            });
    }

    function addMap(products) {
        mapboxgl.accessToken = 'pk.eyJ1IjoicHVlc2JpZW4zMyIsImEiOiJjbDAxMzEyb3cwcWIzM2p0MWoyZmxlNTE1In0.sQ3TcqT8uywjfN41dlymqw';

        map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-0.6000854943333472, 38.82222699462896], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

        products.forEach(product => {
            console.log(product);
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<div class=' + product.ID + '" id="divpopup"><img src="http://localhost/Framework_PHP_OO_MVC_ANGUlAR_JS/frontend/views/images/cars/' + product.image + '">' +
                '<h4>' + product.brand + ' ' + product.model + '</h4>' +
                '<h4 style="color: rgb(177, 41, 0);">' + product.price + ' €</h4></div>');

            const marker1 = new mapboxgl.Marker()
                .setLngLat([product.lon, product.lat])
                .setPopup(popup) // sets a popup on this markers
                .addTo(map);
        });


    }

}]);