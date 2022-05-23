<?php
// require_once("modules\home\model\model\home_model.class.singleton.php");
// require_once("utils\common.inc.php");

class controller_home
{
    function view()
    {
        common::load_view('top_page_home.php', VIEW_PATH_HOME . 'home.html');
    }

    function HomeBrands()
    {
        echo json_encode(common::load_model('home_model', 'get_carousel'));
    }

    function HomeCategories()
    {
        echo json_encode(common::load_model('home_model', 'get_categoria'));
    }

    function HomeTypes()
    {
        echo json_encode(common::load_model('home_model', 'get_types'));
    }

    function load_more()
    {
        // echo json_encode(common::load_model('home_model', 'get_load_more'));
    }
}
