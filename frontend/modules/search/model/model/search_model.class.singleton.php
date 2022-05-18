<?php
// require_once(SITE_ROOT . 'modules\search\model\BLL\search_bll.class.singleton.php');

class search_model
{
    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = search_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_list_categories($args)
    {
        return $this->bll->get_list_categories_BLL($args);
    }

    public function get_list_brands($args)
    {
        return $this->bll->get_list_brands_BLL($args);
    }

    public function get_list_cities($args)
    {
        return $this->bll->get_list_cities_BLL($args);
    }
}
