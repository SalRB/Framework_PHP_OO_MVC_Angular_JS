<?php
    // require_once("modules\shop\model\BLL\shop_bll.class.singleton.php");

    class shop_model {
        private $bll;
        static $_instance;

        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_filters() {
            return $this -> bll -> get_filters_BLL();
        }

        public function get_list_products($args) {
            return $this -> bll -> get_list_products_BLL($args);
        }

        public function get_list_products_with_filters($args) {
            return $this -> bll -> get_list_products_with_filters_BLL($args);
        }

        public function get_list_count_all() {
            return $this -> bll -> get_list_count_all_BLL();
        }

        public function get_list_count_with_filters($args) {
            return $this -> bll -> get_list_count_with_filters_BLL($args);
        }

        public function get_car_datails($args) {
            return $this -> bll -> get_car_datails_BLL($args);
        }

        public function get_count_visits($args) {
            return $this -> bll -> get_count_visits_BLL($args);
        }

        public function get_load_related($args) {
            return $this -> bll -> get_load_related_BLL($args);
        }

        public function get_load_likes($args) {
            return $this -> bll -> get_load_likes_BLL($args);
        }

        public function get_update_likes($args) {
            return $this -> bll -> get_update_likes_BLL($args);
        }

    }
