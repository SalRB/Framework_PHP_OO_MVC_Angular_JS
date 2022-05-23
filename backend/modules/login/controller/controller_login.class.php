<?php
class controller_login
{
    function view()
    {
        common::load_view('top_page_login.php', VIEW_PATH_LOGIN . 'login.html');
    }

    function login()
    {
        echo json_encode(common::load_model('login_model', 'get_login', [$_POST['username'], $_POST['password']]));
    }

    function social_login()
    {
        echo json_encode(common::load_model('login_model', 'get_social_login', $_POST['user_data']));
    }

    function register()
    {
        echo json_encode(common::load_model('login_model', 'get_register', $_POST));
    }

    function verify_email()
    {
        echo json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token']));
    }

    function send_recover_email()
    {
        echo json_encode(common::load_model('login_model', 'get_recover_email', $_POST['email']));
    }

    function verify_token()
    {
        echo json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token']));
    }

    function new_password()
    {
        echo json_encode(common::load_model('login_model', 'get_new_password', [$_POST['data']['token'], $_POST['data']['password']]));
    }

    function logout()
    {
        echo json_encode(common::load_model('login_model', 'get_logout'));
    }

    function data_user()
    {
        echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['token']));
    }

    // Activity

    function control_user()
    {
        echo json_encode(common::load_model('login_model', 'get_control_user', $_POST['token']));
    }

    function actividad()
    {
        echo json_encode(common::load_model('login_model', 'get_actividad'));
    }

    function refresh_token()
    {
        echo json_encode(common::load_model('login_model', 'get_refresh_token', $_POST['token']));
    }

    function refresh_cookie()
    {
        echo json_encode(common::load_model('login_model', 'get_refresh_cookie'));
    }
}
