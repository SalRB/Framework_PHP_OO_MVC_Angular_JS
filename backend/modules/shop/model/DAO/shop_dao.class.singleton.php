<?php
class shop_dao
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

    public function select_filters($db)
    {
        $array_filters = array('brand', 'type', 'category');
        $array_return = array();
        foreach ($array_filters as $row) {
            $sql = 'SELECT DISTINCT ' . $row . ' FROM carsv3';
            $stmt = $db->ejecutar($sql);
            if (mysqli_num_rows($stmt) > 0) {
                while ($row_inner[] = mysqli_fetch_assoc($stmt)) {
                    $array_return[$row] = $row_inner;
                }
                unset($row_inner);
            }
        }
        return $array_return;
    }

    public function select_list_products($db, $items_page)
    {
        if (!empty($items_page[0]['params'][0]['limit'])) {
            $offset = $items_page[0]['params'][0]['limit'];
            $limit = $items_page[0]['params'][1]['offset'];

            $sql = "SELECT * FROM carsv3 ORDER BY visits DESC LIMIT $limit, $offset";
        } else {
            $sql = "SELECT * FROM carsv3 ORDER BY visits DESC LIMIT 0, 3";
        }

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_list_products_with_filters($db, $filters)
    {

        $count = 0;
        $count2 = 0;
        $count3 = 0;

        $sql = "SELECT * FROM carsv3 WHERE ";

        if (!empty($filters['params'][$count]['brand'])) {
            foreach ($filters['params'][$count]['brand'] as $key1) {
                $brand = $filters['params'][$count]['brand'][$count2];
                if ($count3 == 0) {
                    $sql .= "brand = '$brand'";
                    $count2++;
                    $count3++;
                } else {
                    if ($count2 == 0) {
                        $sql .= " AND brand = '$brand'";
                    } else {
                        $sql .= " OR brand = '$brand'";
                    }
                    $count2++;
                }
            }
            $count++;
        }
        $count2 = 0;

        if (!empty($filters['params'][$count]['type'])) {
            foreach ($filters['params'][$count]['type'] as $key2) {
                $type = $filters['params'][$count]['type'][$count2];
                if ($count3 == 0) {
                    $sql .= "type = '$type'";
                    $count2++;
                    $count3++;
                } else {
                    if ($count2 == 0) {
                        $sql .= " AND type = '$type'";
                    } else {
                        $sql .= " OR type = '$type'";
                    }
                    $count2++;
                }
            }
            $count++;
        }

        $count2 = 0;

        if (!empty($filters['params'][$count]['category'])) {
            foreach ($filters['params'][$count]['category'] as $key3) {
                $category = $filters['params'][$count]['category'][$count2];
                if ($count3 == 0) {
                    $sql .= "category = '$category'";
                    $count2++;
                    $count3++;
                } else {
                    if ($count2 == 0) {
                        $sql .= " AND category = '$category'";
                    } else {
                        $sql .= " OR category = '$category'";
                    }
                    $count2++;
                }
            }
            $count++;
        }

        if (!empty($filters['params'][$count]['city'])) {
            $city = $filters['params'][$count]['city'][0];
            if ($count3 == 0) {
                $sql .= "city LIKE '%$city%'";
                $count3++;
            } else {
                $sql .= " AND city LIKE '%$city%'";
            }
        }

        if (!empty($filters['params'][$count]['orderby'])) {
            $orderby = $filters['params'][$count]['orderby'];
            $sql .= " ORDER BY $orderby, visits DESC";
        } else {
            $sql .= " ORDER BY visits DESC";
        }

        if (!empty($filters['params'][$count]['limit'])) {
            $limit = $filters['params'][$count]['limit'];
            $count++;
            $offset = $filters['params'][$count]['offset'];
            $sql .= " LIMIT $offset, $limit";
        } else {
            $sql .= " LIMIT 0, 3";
        }

        // return $sql;
        // exit;

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }


    public function select_count_all_cars($db)
    {
        $sql = "SELECT COUNT(*) AS counted FROM carsv3";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_count_with_filters($db, $filters)
    {
        $count = 0;
        $count2 = 0;
        $count3 = 0;

        $sql = "SELECT COUNT(*) AS counted FROM carsv3 WHERE ";

        if (!empty($filters['params'][$count]['brand'])) {
            foreach ($filters['params'][$count]['brand'] as $key1) {
                $brand = $filters['params'][$count]['brand'][$count2];
                if ($count3 == 0) {
                    $sql .= "brand = '$brand'";
                    $count2++;
                    $count3++;
                } else {
                    if ($count2 == 0) {
                        $sql .= " AND brand = '$brand'";
                    } else {
                        $sql .= " OR brand = '$brand'";
                    }
                    $count2++;
                }
            }
            $count++;
        }
        $count2 = 0;

        if (!empty($filters['params'][$count]['type'])) {
            foreach ($filters['params'][$count]['type'] as $key2) {
                $type = $filters['params'][$count]['type'][$count2];
                if ($count3 == 0) {
                    $sql .= "type = '$type'";
                    $count2++;
                    $count3++;
                } else {
                    if ($count2 == 0) {
                        $sql .= " AND type = '$type'";
                    } else {
                        $sql .= " OR type = '$type'";
                    }
                    $count2++;
                }
            }
            $count++;
        }

        $count2 = 0;

        if (!empty($filters['params'][$count]['category'])) {
            foreach ($filters['params'][$count]['category'] as $key3) {
                $category = $filters['params'][$count]['category'][$count2];
                if ($count3 == 0) {
                    $sql .= "category = '$category'";
                    $count2++;
                    $count3++;
                } else {
                    if ($count2 == 0) {
                        $sql .= " AND category = '$category'";
                    } else {
                        $sql .= " OR category = '$category'";
                    }
                    $count2++;
                }
            }
            $count++;
        }

        if (!empty($filters['params'][$count]['city'])) {
            $city = $filters['params'][$count]['city'][0];
            if ($count3 == 0) {
                $sql .= "city LIKE '%$city%'";
                $count3++;
            } else {
                $sql .= " AND city LIKE '%$city%'";
            }
        }

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_car_details($db, $ID)
    {
        $sql = "SELECT * FROM carsv3 WHERE ID = '$ID'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_car_images($db, $ID)
    {
        $sql = "SELECT * FROM car_images WHERE car_ID = '$ID'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_count_visits($db, $ID)
    {
        $sql = "UPDATE carsv3 SET visits = visits+1 WHERE ID = '$ID'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_load_related($db, $related)
    {
        $limit = $related[0]['limit'];
        $offset = $related[1]['offset'];
        $id = $related[2]['id'];

        $sql = "SELECT * FROM carsv3 WHERE id <> '$id' AND brand = (SELECT brand FROM carsv3 WHERE id = '$id') OR type = (SELECT type FROM carsv3 WHERE id = '$id') LIMIT $offset, $limit";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_likes($db, $user)
    {
        $sql = "SELECT car FROM likes WHERE user = '$user'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function insert_like($db, $user, $car)
    {
        $sql = "INSERT INTO likes (user, car) VALUES ('$user','$car')";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function delete_like($db, $user, $car)
    {
        $sql = "DELETE FROM likes WHERE user='$user' AND car='$car'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
}
