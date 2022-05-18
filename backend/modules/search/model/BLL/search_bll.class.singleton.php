<?php
// require_once(SITE_ROOT . 'modules\search\model\DAO\search_dao.class.singleton.php');

class search_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = search_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function get_list_categories_BLL($args)
	{
		return $this->dao->select_categories($this->db, $args);
	}

	public function get_list_brands_BLL($args)
	{
		return $this->dao->select_brands($this->db, $args);
	}

	public function get_list_cities_BLL($args)
	{
		return $this->dao->select_cities($this->db, $args);
	}
}
