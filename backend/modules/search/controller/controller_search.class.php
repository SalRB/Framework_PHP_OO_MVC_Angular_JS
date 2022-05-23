<?php
class controller_search
{
    function CategoriesSearch()
    {
        echo json_encode(common::load_model('search_model', 'get_list_categories', [$_POST]));
    }

    function BrandsSearch()
    {
        echo json_encode(common::load_model('search_model', 'get_list_brands', [$_POST]));
    }

    function AutocompleteSearch()
    {
        echo json_encode(common::load_model('search_model', 'get_list_cities', [$_POST]));
    }
}
