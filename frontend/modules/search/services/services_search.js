app.factory('services_search', ['services', '$rootScope', function (services, $rootScope) {
    let service = { search_category: search_category, search_brand: search_brand, search_cities: search_cities, search: search };
    return service;

    function search_category() {
        services.post('search', 'CategoriesSearch')
            .then(function (response) {
                $rootScope.categories = response;
            }, function (error) {
                console.log(error);
            });
    }

    function search_brand(category = undefined) {
        services.post('search', 'BrandsSearch', { category })
            .then(function (response) {
                console.log(response);
                $rootScope.brands = response;
            }, function (error) {
                console.log(error);
            });
    }

    function search_cities(category = '', brand = '', city = '') {

        filters = [];

        filters.push({ "category": category });
        filters.push({ "brand": brand });
        filters.push({ "city": city });

        services.post('search', 'AutocompleteSearch', { filters })
            .then(function (response) {
                $rootScope.cities = response;
            }, function (error) {
                console.log(error);
            });
    }

    function search(category = null, brand = null, city = null) {

        filters = [];
        brand1 = [];
        category1 = [];
        city1 = [];

        if (brand != null) {
            brand1.push(brand);
            filters.push({ "brand": brand1 });
        }

        if (category != null) {
            category1.push(category);
            filters.push({ "category": category1 });
        }

        if (city != null) {
            city1.push(city);
            filters.push({ "city": city1 });
        }
        console.log(filters);
        if (filters) {
            localStorage.setItem("filters", JSON.stringify(filters));
            location.href = "#/shop/";
        }
    }

}]);