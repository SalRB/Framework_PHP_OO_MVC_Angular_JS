<?php
// require_once("modules\shop\model\DAO\shop_dao.class.singleton.php");

class shop_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = shop_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function get_filters_BLL()
	{
		return $this->dao->select_filters($this->db);
	}

	public function get_list_products_BLL($args)
	{
		return $this->dao->select_list_products($this->db, $args);
	}

	public function get_list_products_with_filters_BLL($args)
	{
		return $this->dao->select_list_products_with_filters($this->db, $args);
	}

	public function get_list_count_all_BLL()
	{
		return $this->dao->select_count_all_cars($this->db);
	}

	public function get_list_count_with_filters_BLL($args)
	{
		return $this->dao->select_count_with_filters($this->db, $args);
	}
	
	public function get_car_datails_BLL($args)
	{
		$var = array();
		$var[0] = $this->dao->select_car_details($this->db, $args);
		$var[1] = $this->dao->select_car_images($this->db, $args);
		return $var;
	}

	public function get_count_visits_BLL($args)
	{
		return $this->dao->update_count_visits($this->db, $args);
	}

	public function get_load_related_BLL($args)
	{
		return $this->dao->select_load_related($this->db, $args);
	}

}
