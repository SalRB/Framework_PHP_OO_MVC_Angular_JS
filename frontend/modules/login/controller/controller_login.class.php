<?php
class controller_login
{
    function view()
    {
        common::load_view('top_page_login.php', VIEW_PATH_LOGIN . 'login.html');
    }

    function login()
    {
        // echo json_encode($_POST['username']);
        // exit;
        echo json_encode(common::load_model('login_model', 'get_login', [$_POST['username'], $_POST['password']]));
    }

    function social_login()
    {
        echo json_encode(common::load_model('login_model', 'get_social_login', $_POST['user_data']));
    }

    function register()
    {
        $result = json_encode(common::load_model('login_model', 'get_register', $_POST));
        if ($result != '"error"') {
            $message = [
                'type' => 'validate',
                'token' => $result,
                'toEmail' => $_POST['email']
            ];
            $email = json_decode(mail::send_email($message), true);
            if (!empty($email)) {
                echo json_encode('enviado');
                return;
            }
        } else {
            echo json_encode('error');
            return;
        }
    }

    function verify_email()
    {
        echo json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token']));
        exit;

        // $verify = json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token']));
        // if (!empty($verify)) {
        //     return;
        // }
    }

    function send_recover_email()
    {
        $result = json_encode(common::load_model('login_model', 'get_recover_email', $_POST['email']));
        $result = explode('"', $result);
        $result = $result[1];

        if ($result) {
            $message = [
                'type' => 'recover',
                'token' => $result,
                'toEmail' => $_POST['email']
            ];
            $email = json_decode(mail::send_email($message), true);

            if (!empty($email)) {
                echo json_encode('done');
                return;
            }
        } else {
            echo json_encode('fail');
            return;
        }
    }

    function verify_token()
    {
        $verify = json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token']));
        if (!empty($verify)) {
            echo $verify;
            return;
        }
    }

    function new_password()
    {
        // echo json_encode([$_POST['data']['token'], $_POST['data']['password']]);
        // exit;
        $password = json_encode(common::load_model('login_model', 'get_new_password', [$_POST['data']['token'], $_POST['data']['password']]));
        echo json_encode($password);
        exit;
        if (!empty($password)) {
            echo json_encode($password);
            return;
        }
    }

    function logout()
    {
        echo json_encode('Done');
    }

    function data_user()
    {
        echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['token']));
    }

}
