app.factory('services_shop', ['services', '$rootScope', function (services, $rootScope) {
    let service = { details: details, load: load, load_with_filters: load_with_filters, add_favs: add_favs, load_favs: load_favs, save_filters: save_filters, addMap: addMap };
    return service;

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

    function load(products) {
        $rootScope.products = products;
    }

    function load_with_filters(params) {
        console.log(params);
        services.post('shop', 'Filters', { params })
            .then(function (response) {
                console.log(response);
                addMap(response);
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
            // console.log(product);
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<div class=' + product.ID + '" id="divpopup"><img src="http://localhost/Framework_PHP_OO_MVC_ANGUlAR_JS/frontend/views/images/cars/' + product.image + '">' +
                '<h4>' + product.brand + ' ' + product.model + '</h4>' +
                '<h4 style="color: rgb(177, 41, 0);">' + product.price + ' €</h4></div>');

            const marker1 = new mapboxgl.Marker()
                .setLngLat([product.lon, product.lat])
                .setPopup(popup) // sets a popup on this markers
                .addTo(map);
        });
    }

    function load_favs() {
        if (localStorage.token) {
            // console.log('as');

            let token = localStorage.getItem('token');
            // console.log(token);
            
            // token = token.split('"');
            // token = token[1];

            services.post('shop', 'LoadLikes', { token: token })
                .then(function (response) {
                    console.log(response);
                    for (row in $rootScope.products) {
                        $rootScope.products[row].like = "fa-heart-o";
                        var product = $rootScope.products[row];
                        for (row in response) {
                            // console.log(response[row].car);
                            // console.log(product.ID);
                            if (response[row].car == product.ID) {
                                product.like = "fa-heart";
                                // console.log($rootScope.products[row].like);
                            };
                        }
                        // $rootScope.products[row].like = product.like;
                        // console.log($rootScope.products[row].like);
                    }
                }, function (error) {
                    console.log(error);
                });

        } else {
            for (row in $rootScope.products) {
                $rootScope.products[row].like = "fa-heart-o";
            }
        }
    }

    function add_favs(codigo_producto, user) {
        services.post('shop', 'click_like', { id: codigo_producto, user: user })
            .then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
    }


}]);