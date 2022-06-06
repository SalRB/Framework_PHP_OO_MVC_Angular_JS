<?php
class login_dao
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

    public function insert_user($db, $username, $email, $password, $avatar, $token, $UUID)
    {
        $sql = "INSERT INTO `users`(`username`, `email`, `passwd`, `type`, `avatar`, `token_email`, `active`, `UUID`)     
                VALUES ('$username','$email','$password','client', '$avatar','$token', 0, '$UUID')";
        return $stmt = $db->ejecutar($sql);
    }

    public function select_user($db, $username)
    {
        $sql = "SELECT `UUID`, `username`, `email`, `passwd`, `type`, `avatar`, `token_email`, `active` FROM `users` WHERE username='$username'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_user_social($db, $UUID)
    {
        $sql = "SELECT `UUID`, `username`, `email`, `passwd`, `type`, `avatar`, `token_email`, `active` FROM `users` WHERE UUID='$UUID'";

        $stmt = $db->ejecutar($sql);

        return $db->listar($stmt);
    }

    public function select_social_login($db, $id)
    {
        $sql = "SELECT * FROM `users` WHERE id='$id'";
     
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function insert_social_login($db, $username, $email, $avatar, $UUID)
    {
        $sql = "INSERT INTO `users`(`username`, `email`, `type`, `avatar`, `UUID`)     
                VALUES ('$username','$email','client', '$avatar', '$UUID')";

        return $stmt = $db->ejecutar($sql);
    }

    // public function update_token_jwt($db, $token, $email)
    // {
    //     $sql = "UPDATE `users` SET `UUID`= '$token' WHERE `email` = '$email'";
    //     $stmt = $db->ejecutar($sql);
    //     return "update";
    // }

    public function select_verify_email($db, $token)
    {
        $sql = "SELECT `token_email` FROM `users` WHERE `token_email` = '$token'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_verify_email($db, $token)
    {
        $sql = "UPDATE `users` SET `active`= 1, `token_email`= '' WHERE `token_email` = '$token'";
        $stmt = $db->ejecutar($sql);
        return "update";
    }

    public function select_recover_password($db, $email)
    {
        $sql = "SELECT `email` FROM `users` WHERE email='$email'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_recover_password($db, $email, $token)
    {
        $sql = "UPDATE `users` SET `token_email`= '$token', `active`= 0 WHERE `email` = '$email'";
        $stmt = $db->ejecutar($sql);
        return "ok";
    }

    public function update_new_passwoord($db, $token, $password)
    {
        $sql = "UPDATE `users` SET `passwd`= '$password', `token_email`= '', `active`= 1 WHERE `token_email` = '$token'";
        $stmt = $db->ejecutar($sql);
        return "ok";
    }

    public function select_data_user($db, $token)
    {
        $sql = "SELECT `UUID`, `username`, `email`, `passwd`, `type`, `avatar`, `token_email`, `active` FROM `users` WHERE UUID='$token'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
}
