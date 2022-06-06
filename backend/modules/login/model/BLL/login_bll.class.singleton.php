<?php
class login_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = login_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function get_register_BLL($args)
	{
		// Procesado para que puedan repetirse usuarios y mails siempre y cuando utilicen metodos de log distintos

		$UUID = hash('ripemd160', $args['username']);
		$UUID = "manual-" . $UUID;
		$username = "manual-" . $args['username'];
		$hashed_pass = password_hash($args['password'], PASSWORD_DEFAULT);
		$hashavatar = md5(strtolower(trim($args['email'])));
		$avatar = "https://robohash.org/$hashavatar";
		$token = common::generate_Token_secure(20);

		$select = $this->dao->insert_user($this->db, $username, $args['email'], $hashed_pass, $avatar, $token, $UUID);

		if (!$select) {
			return 'error';
			exit;
		} else {
			$token = '"' . $token . '"';
			$message = [
				'type' => 'validate',
				'token' => $token,
				'toEmail' => $args['email']
			];
			$email = json_decode(mail::send_email($message), true);
			if (!empty($email)) {
				return 'enviado';
			}
		}

		return $token;
	}

	public function get_login_BLL($args)
	{
		// Procesado para que puedan repetirse usuarios y mails siempre y cuando utilicen metodos de log distintos

		$username = "manual-" . $args[0];
		$user = $this->dao->select_user($this->db, $username);
		if (!empty($user)) {
			if (password_verify($args[1], $user[0]['passwd'])) {
				$jwt = jwt_process::encode($user[0]['username']);

				$_SESSION['username'] = $user[0]['username'];
				$_SESSION['tiempo'] = time();

				return json_encode($jwt);
			}
		}
		return "error";
	}

	public function get_social_login_BLL($args)
	{
		$user = $this->dao->select_user_social($this->db, $args[3]);

		if (!$user) {
			$this->dao->insert_social_login($this->db, $args[0], $args[1], $args[2], $args[3]);
			$jwt = jwt_process::encode($args[0]);

			$_SESSION['username'] = $user[0]['username'];
			$_SESSION['tiempo'] = time();

			return json_encode($jwt);
			exit;
		}

		$_SESSION['username'] = $user[0]['username'];
		$_SESSION['tiempo'] = time();

		$jwt = jwt_process::encode($user[0]['username']);
		return json_encode($jwt);
	}

	public function get_verify_email_BLL($args)
	{
		if ($this->dao->select_verify_email($this->db, $args)) {
			$this->dao->update_verify_email($this->db, $args);
			return 'verify';
		}
		return 'fail';
	}

	public function get_recover_email_BLL($args)
	{
		$user = $this->dao->select_recover_password($this->db, $args);
		$token = common::generate_Token_secure(20);
		if (!empty($user)) {
			$this->dao->update_recover_password($this->db, $args, $token);

			$message = [
				'type' => 'recover',
				'token' => $token,
				'toEmail' => $args
			];
			$email = json_decode(mail::send_email($message), true);

			if (!empty($email)) {
				return 'done';
			}


			return $token;
		}
		return "fail";
	}

	public function get_verify_token_BLL($args)
	{
		if ($this->dao->select_verify_email($this->db, $args)) {
			return 'verify';
		}
		return 'fail';
	}

	public function get_new_password_BLL($args)
	{
		$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
		if ($this->dao->update_new_passwoord($this->db, $args[0], $hashed_pass)) {
			return 'new_password';
		}
		return 'fail';
	}

	public function get_data_user_BLL($args)
	{
		return $this->dao->select_data_user($this->db, $args);
	}

	public function get_logout_BLL()
	{
		unset($_SESSION['tiempo']);
		unset($_SESSION['username']);
		session_destroy();
		return 'Done';
	}

	// Activity

	public function get_control_user_BLL($args)
	{
		$jwt = jwt_process::decode($args);
		$jwt = json_decode($jwt, TRUE);

		if ($jwt['name'] == $_SESSION['username']) {
			$_SESSION['tiempo'] = time();
			return 'valid';
		} else {
			return 'invalid_user';
		}
	}

	public function get_actividad_BLL()
	{
		if (!isset($_SESSION["tiempo"])) {
			echo "inactivo";
		} else {
			if ((time() - $_SESSION["tiempo"]) >= 1800) { // Media hora
				echo "inactivo";
				exit();
			} else {
				echo "activo";
				exit();
			}
		}
	}

	public function get_refresh_token_BLL($args)
	{
		$jwt = jwt_process::decode($args);
		$jwt = json_decode($jwt, TRUE);

		$token = jwt_process::encode($jwt['name']);
		return $token;
	}

	public function get_refresh_cookie_BLL()
	{
		session_regenerate_id();
		return "Done";
	}
}
