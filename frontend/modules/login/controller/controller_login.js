app.controller('controller_login', function ($scope, $route, $rootScope, services, services_login, services_social_login, toastr) {
    $scope.regex_username = /^[A-Za-z0-9._-]{5,15}$/;
    $scope.regex_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $scope.regex_password = /^[A-Za-z0-9._-]{5,20}$/;

    $scope.login = function () {
        services_login.login($scope.username, $scope.password);
    }

    $scope.register = function () {
        services_login.register($scope.username_r, $scope.password_r, $scope.email_r);
    }

    $scope.social_login = function (method) {
        services_social_login.social_login(method);
    };

    $scope.login_github = function () {
        services_social_login.github();
    };

    $scope.send_email_recover = function () {
        services_login.send_recover_email($scope.email_recover);
    }
    
    $scope.recover_password = function () {
        services_login.new_password($route.current.params.token, $scope.new_password);
    }

    let path = $route.current.originalPath.split('/');
    if (path[1] === 'logout') {
        services_login.logout();
    } else if (path[1] === 'login') {
        $scope.show_recover, show_recover_wo_token = false;
        $scope.show_register_login = true;
    } else if (path[1] === 'verify') {
        services_login.verify_email($route.current.params.token);
    } else if (path[1] === 'recover') {
        if ($route.current.params.token) {
            $scope.show_register_login, show_recover = false;
            $scope.show_recover = true;
        } else {
            $scope.show_recover_wo_token = true;
            $scope.show_register_login, show_recover_wo_token = false;
        }
    }

});
