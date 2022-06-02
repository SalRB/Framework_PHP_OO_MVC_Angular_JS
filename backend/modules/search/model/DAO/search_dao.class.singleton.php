<?php

class search_dao
{
    static $_instance;

    private function __construct()
    {
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function select_categories($db, $filters)
    {
        $sql = "SELECT DISTINCT category FROM carsv3";

        // if (!empty($filters['filters'][1]['brand'])) {
        //     $brand = $filters['filters'][1]['brand'][0];
        //     $sql .= " WHERE brand = '$brand'";
        // }

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    function select_brands($db, $filters)
    {
        $sql = "SELECT DISTINCT brand FROM carsv3";

        if (!empty($filters[0]['category'])) {
            $category = $filters[0]['category'];
            $sql .= " WHERE category = '$category'";
        }
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    function select_cities($db, $filters)
    {
        $sql = "SELECT DISTINCT city FROM carsv3 ";

        $count = 0;
        if (strlen($filters[0]['filters'][0]['category']) > 1) {
            $category = $filters[0]['filters'][0]['category'];
            if ($count == 0) {
                $sql .= " WHERE ";
                $count++;
            }
            $sql .= "category = '$category' ";
        }

        if (strlen($filters[0]['filters'][1]['brand']) > 1) {
            $brand = $filters[0]['filters'][1]['brand'];
            if ($count == 0) {
                $sql .= " WHERE ";
                $sql .= "brand = '$brand' ";
                $count++;
            } else {
                $sql .= " AND brand = '$brand' ";
            }
        }
        $city = $filters[0]['filters'][2]['city'];

        if ($count == 0) {
            $sql .= " WHERE city LIKE '%$city%'";
        } else {
            $sql .= " AND city LIKE '%$city%'";
        }

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
}
