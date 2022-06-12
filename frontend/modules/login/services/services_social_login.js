app.factory('services_social_login', ['services', 'services_localstorage', 'toastr', function (services, services_localstorage, toastr) {
    let service = { social_login: social_login, firebase_config: firebase_config, provider_config: provider_config };
    return service;

    function social_login(param) {
        authService = firebase_config();

        authService.signInWithPopup(provider_config(param))
            .then(function (result) {
                // Procesado para que puedan repetirse usuarios y mails siempre y cuando utilicen metodos de log distintos

                username = param + '-' + result.user.displayName;
                email = param + '-' + result.user.email;
                pfp = result.user.photoURL;
                UUID = param + '-' + result.user.uid;
                user_data = [username, email, pfp, UUID];

                // console.log(user_data);

                services.post('login', 'social_login', { user_data })
                    .then(function (data) {

                        token = data.split('"');
                        token = token[2];
                        token = token.split("\\");
                        token = token[0];
                        console.log(token);

                        // localStorage.setItem("token", token);
                        services_localstorage.setSession(token);
                        toastr.success("Login successful");
                        setTimeout(' window.location.href =  "#/home"', 1000);

                    }).catch(function (e) {
                        console.log(e);
                    });

            }, function (error) {
                console.log(error);
            });
    }// end_socialLogIn

    function firebase_config() {
        var config = {

            apiKey: "AIzaSyA33OBjF0VuAelFYUJas3EsW2lLbxtgxus",
            authDomain: "fir-346614.firebaseapp.com",
            projectId: "firebase-346614",
            storageBucket: "firebase-346614.appspot.com",
            messagingSenderId: "401305423579",
            appId: "1:401305423579:web:dc710cd213c76f87cc06fe",
            databaseURL: "https://website-306519.firebaseio.com"

        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        } else {
            firebase.app();
        }
        return authService = firebase.auth();
    }

    function provider_config(param) {
        if (param === 'google') {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            return provider;
        } else if (param === 'github') {
            return provider = new firebase.auth.GithubAuthProvider();
        }
    }

}]);



