app.factory('services_login', ['services', 'services_localstorage', '$rootScope', 'toastr', function (services, services_localstorage, $rootScope, toastr) {
    let service = { login: login, logout: logout, register: register, verify_email: verify_email, recover_password: recover_password, new_password: new_password };
    return service;

    function login(username, password) {
        services.post('login', 'login', { username: username, password: password })
            .then(function (result) {
                token = result.split('"');
                token = token[2];
                token = token.split("\\");
                token = token[0];

                if (result == '"error"') {
                    toastr.error("Incorrect password");
                } else {
                    services_localstorage.setSession(result);
                    toastr.success("Login successful");
                    setTimeout(' window.location.href =  "#/home"', 1000);
                }
                return;
            }, function (error) {
                console.log(error);
            });
    }

    function logout() {
        services.post('login', 'logout')
            .then(function (result) {
                services_localstorage.clearSession();
                location.href = "#/home/";
                window.location.reload();
            }, function (error) {
                console.log(error);
            });
    }

    function register(username, email, password) {
        services.post('login', 'register', { username: username, password: password, email: email })
            .then(function (result) {
                if (result == 'error') {
                    toastr.error('Username or email already in use');
                } else {
                    toastr.success('Verification email sended');
                }
            }, function (error) {
                console.log(error);
            });
    }

    function verify_email(token) {
        services.post('login', 'verify_email', { token: token })
            .then(function (response) {
                $rootScope.token = response;
                location.href = "#/login ";
                return;
            }, function (error) {
                console.log(error);
            });
    }

    function recover_password(email) {
        services.post('login', 'send_recover_email', { email: email })
            .then(function (response) {
                $rootScope.token = response;
                location.href = "#/login ";
                return;
            }, function (error) {
                console.log(error);
            });
    }

    function new_password(token, password) {
        services.post('login', 'new_password', { token: token, password: password })
            .then(function (response) {
                $rootScope.token = response;
                location.href = "#/login ";
                return;
            }, function (error) {
                console.log(error);
            });
    }

}]);