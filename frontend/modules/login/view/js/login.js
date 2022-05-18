// ------------------- LOGIN ------------------------ //

function login() {
    if (validate_login() != 0) {
        var data = $('#login_form').serialize();
        // console.log($('#login_form').serialize());
        // ajaxPromise('modules/login/controller/controller_login.php?op=login',
        //     'POST', 'JSON', data)
        $.ajax({
            url: friendlyURL("?module=login&op=login"),
            dataType: "JSON",
            type: "POST",
            data: data,
        }).done(function (result) {
            // console.log(result);
            if (result == "error") {
                $("#error_login_password").html('La contraseña no es correcta');
            } else {
                localStorage.setItem("token", result);
                setTimeout(' window.location.href = friendlyURL("?module=home&op=view"); ', 1000);
            }
        }).fail(function (e) {
            console.log(e);
        });
    }
}

function key_login() {
    $("#login_form").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
}

function button_login() {
    $('#login_button').on('click', function (e) {
        e.preventDefault();
        login();
    });
}

function validate_login() {
    var error = false;

    if (document.getElementById('l_username').value.length === 0) {
        document.getElementById('error_login_username').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        document.getElementById('error_login_username').innerHTML = "";
    }

    if (document.getElementById('l_password').value.length === 0) {
        document.getElementById('error_login_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        document.getElementById('error_login_password').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}


function click_social_login() {

    $('#google').on('click', function (e) {
        social_login('google');
    });

    $('#github').on('click', function (e) {
        social_login('github');
    });
}


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

            ajaxPromise(friendlyURL('?module=login&op=social_login'), 'POST', 'JSON', { user_data })
                .then(function (data) {
                    console.log(data);
                    localStorage.setItem("token", data);
                    toastr.success("Login successful");
                    setTimeout(' window.location.href = friendlyURL("?module=home&op=view"); ', 1000);

                }).catch(function (e) {
                    console.log(e);
                });



        })
        .catch(function (error) {
            console.log('Se ha encontrado un error:', error);
        });
}

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

// ------------------- REGISTER ------------------------ //

function register() {
    if (validate_register() != 0) {
        var data = $('#register_form').serialize();
        // console.log(data);
        // ajaxPromise('modules/login/controller/controller_login.php?op=register',
        //     'GET', 'JSON', data)
        $.ajax({
            url: friendlyURL("?module=login&op=register"),
            dataType: "JSON",
            type: "POST",
            data: data,


        }).done(function (result) {
            // console.log(result);

            if (result == 'error') {
                toastr.error('Username or email already in use');
            } else {
                toastr.success('Verification email sended');
            }

            // if ((result == "error_username") || (result == "error_email") || (result == "error_email_username")) {
            //     $("#error_username").empty();
            //     $("#error_email").empty();
            //     if (result == "error_username") {
            //         $("#error_username").html('El username ya esta registrado');
            //     }
            //     if (result == "error_email") {
            //         $("#error_email").html('El email ya esta registrado');
            //     }
            //     if (result == "error_email_username") {
            //         $("#error_username").html('El username ya esta registrado');
            //         $("#error_email").html('El email ya esta registrado');
            //     }
            // } else {
            //     setTimeout(' window.location.href = "index.php?module=login&op=list"; ', 222);
            // }
        }).fail(function (e) {
            console.log(e);
        });
    }
}

function key_register() {
    $("#register_form").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            register();
        }
    });
}

function button_register() {
    $('#register_button').on('click', function (e) {
        e.preventDefault();
        register();
    });
}

function validate_register() {
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if (document.getElementById('username').value.length === 0) {
        document.getElementById('error_username').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username').value.length < 8) {
            document.getElementById('error_username').innerHTML = "El username tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_username').innerHTML = "";
        }
    }

    if (document.getElementById('email').value.length === 0) {
        document.getElementById('error_email').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email').value)) {
            document.getElementById('error_email').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email').innerHTML = "";
        }
    }

    if (document.getElementById('password').value.length === 0) {
        document.getElementById('error_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        if (document.getElementById('username').value.length < 8) {
            document.getElementById('error_password').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_password').innerHTML = "";
        }
    }

    if (error == true) {
        return 0;
    }
}


// ------------------- RECOVER PASSWORD ------------------------ //
function load_form_recover_password() {
    $('.login-html').empty();
    $('<form></form>').attr({ 'id': 'email__form', 'method': 'post' }).html('<h2 style="color:white;">Recover password</h2>').appendTo('.login-html');
    $('<div></div>').attr({ 'class': 'form__content' }).appendTo('#email__form');
    $('<div></div>').attr({ 'class': 'form__input' }).html('<label style="color:white;" for="email"><b>Email: </b></label>' +
        '<input type="text" class="input" placeholder="Enter email" id="email" name="email" required><br>' +
        '<font color="red"><span id="error_email" class="error"></span></font>').appendTo('.form__content');
    $('<div></div>').attr({ 'class': 'button_container' }).html('<input class="button" id="button_email" type="button" value = "Enter"/>').appendTo('.form__content');
    click_recover_password();
}

function click_forgot_button() {

    $('#forgot').on('click', function (e) {
        e.preventDefault();
        load_form_recover_password();
    });
}


function click_recover_password() {
    $("#email__form").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            send_recover_password();
        }
    });

    $('#button_email').on('click', function (e) {
        e.preventDefault();
        send_recover_password();
    });
}

function validate_recover_password() {
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if (document.getElementById('email').value.length === 0) {
        document.getElementById('error_email').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email').value)) {
            document.getElementById('error_email').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email').innerHTML = "";
        }
    }

    if (error == true) {
        return 0;
    }
}

function send_recover_password() {

    if (validate_recover_password() != 0) {
        var email = $('#email').val();

        ajaxPromise(friendlyURL('?module=login&op=send_recover_email'), 'POST', 'JSON',
            { email })
            .then(function (data) {
                // console.log(data);
                toastr.success('Email sended');
            }).catch(function (e) {
                console.log(e);
                toastr.error('Error');
            });
    }
}

function load_form_new_password(token) {
    // console.log(token);


    ajaxPromise(friendlyURL('?module=login&op=verify_token'), 'POST', 'JSON', { token })
        .then(function (data) {
            // console.log(data);
            // toastr.success('Email sended');
            $('.login-html').empty();
            $('<form></form>').attr({ 'id': 'new_password__form', 'method': 'post' }).html('<h2 style="color:white;">New password</h2>').appendTo('.login-html');
            $('<div></div>').attr({ 'class': 'form__content' }).appendTo('#new_password__form');
            $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="password"><b style="color:white;">New password:</b></label>' +
                '<input type="password" placeholder="Enter password" id="password" name="password" required>' +
                '<font color="red"><span id="error_password" class="error"></span></font>').appendTo('.form__content');
            $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="password1"><b style="color:white;">Repeat password:</b></label>' +
                '<input type="password" placeholder="Enter password" id="password1" name="password1" required>' +
                '<font color="red"><span id="error_password1" class="error"></span></font>').appendTo('.form__content');
            $('<div></div>').attr({ 'class': 'button_container' }).html('<input class="button" id="recover" type="button" value = "Enter"/>').appendTo('.form__content');
            click_new_password(token);



        }).catch(function (e) {
            console.log(e);
            // toastr.error('Error');
        });


}

function click_new_password(token) {
    $("#new_password__form").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            send_new_password(token);
        }
    });

    $('#recover').on('click', function (e) {
        e.preventDefault();
        send_new_password(token);
    });
}

function validate_new_password() {
    if (document.getElementById('password').value.length === 0) {
        document.getElementById('error_password1').innerHTML = "";
        document.getElementById('error_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        if (document.getElementById('password').value.length < 8) {
            document.getElementById('error_password1').innerHTML = "";
            document.getElementById('error_password').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (document.getElementById('password').value !== document.getElementById('password1').value) {
                document.getElementById('error_password').innerHTML = "";
                document.getElementById('error_password1').innerHTML = "Las contraseñas no son iguales";
                error = true;
            } else {
                document.getElementById('error_password').innerHTML = "";
                error = false;
            }
        }
    }
    return error;
}

function send_new_password(token) {

    if (validate_new_password() == false) {
        var data = { token: token, password: $('#password').val() };
        // console.log(data);

        ajaxPromise(friendlyURL("?module=login&op=new_password"), 'POST', 'JSON', { data })
            .then(function (data) {
                toastr.success('Password updated');
                setTimeout(' window.location.href = friendlyURL("?module=login&op=view"); ', 1000);

            }).catch(function (e) {
                console.log(e);
            });
    }
}

// ------------------- LOAD CONTENT ------------------------ //
function load_content() {
    let path = window.location.pathname.split('/');
    // console.log(path[3]);

    // $('.container').empty();
    if (path[4] === 'recover') {
        load_form_new_password(path[5]);
    } else if (path[4] === 'verify') {
        token = path[5].split('%22');
        token = token[1]
        // console.log(token);

        ajaxPromise(friendlyURL("?module=login&op=verify_email"),
            'POST', 'JSON', { token })

    }

    //  else if (path[2] === 'register') {
    //     load_register();
    // } else if (path[2] === 'login') {
    //     load_login();
    // }
}

$(document).ready(function () {
    load_content();
    key_register();
    button_register();
    key_login();
    button_login();
    click_forgot_button();
    click_social_login();
});