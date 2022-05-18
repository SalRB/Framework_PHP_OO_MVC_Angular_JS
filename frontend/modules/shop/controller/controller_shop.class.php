<?php
// require_once("modules\shop\model\model\shop_model.class.singleton.php");

class controller_shop
{

    function view()
    {
        common::load_view('top_page_shop.php', VIEW_PATH_SHOP . 'shop.html');
    }

    function FiltersContent()
    {
        echo json_encode(common::load_model('shop_model', 'get_filters'));
    }

    function AllCars()
    {
        // echo json_encode($_POST);
        // exit;
        echo json_encode(common::load_model('shop_model', 'get_list_products', [$_POST]));
    }

    function Filters()
    {
        echo json_encode(common::load_model('shop_model', 'get_list_products_with_filters', $_POST));
    }

    function CountAll()
    {
        echo json_encode(common::load_model('shop_model', 'get_list_count_all'));
    }

    function CountWithFilters()
    {
        // echo json_encode($_POST['params']);
        // exit;
        echo json_encode(common::load_model('shop_model', 'get_list_count_with_filters', $_POST));
    }

    function ShopDetails()
    {
        echo json_encode(common::load_model('shop_model', 'get_car_datails', $_POST['id']));
    }

    function CountVisits()
    {
        echo json_encode(common::load_model('shop_model', 'get_count_visits', $_POST['id']));
    }

    function LoadRelated()
    {
        echo json_encode(common::load_model('shop_model', 'get_load_related', $_POST['related']));
    }
}
