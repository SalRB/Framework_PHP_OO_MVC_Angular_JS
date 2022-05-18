/*==================== LOAD MENU ====================*/
function load_menu() {

    $('<li></li>').attr({ 'id': 'liLogin' }).appendTo('#ulMenu');  // header.html linea 75
    $('<li></li>').attr({ 'id': 'liContact' }).appendTo('#ulMenu');

    $('<a></a>').attr({ 'class': 'menu-btn', 'href': friendlyURL("?module=contact&op=view") }).html('Contact Us').appendTo('#liContact');
    $('<a></a>').attr({ 'class': 'menu-btn', 'id': 'home', 'href': friendlyURL("?module=home&op=view"), 'data-tr': 'Home' }).html('Inicio').appendTo('.home-button');
    $('<a></a>').attr({ 'class': 'menu-btn', 'id': 'shop', 'href': friendlyURL("?module=shop&op=view"), 'data-tr': 'Shop' }).html('Tienda').appendTo('.shop-button');

    token = localStorage.getItem('token');
    if (token) {
        token = token.split('"');
        token = token[1];
    }
    // console.log(token);

    ajaxPromise(friendlyURL("?module=login&op=data_user"), 'POST', 'JSON',
        { token })
        .then(function (data) {
            // console.log(data);
            $('<a></a>').attr({ 'class': 'menu-btn', 'id': 'logout' }).html('Log out').appendTo('#liLogin');
        }).catch(function (e) {
            $('<a></a>').attr({ 'class': 'menu-btn', 'id': 'login', 'href': friendlyURL("?module=login&op=view") }).html('Login').appendTo('#liLogin');
        });
}

/*==================== CLICK LOGOUT ====================*/
function click_logout() {
    $(document).on('click', '#logout', function () {
        logout();
    });
}

/*==================== LOGOUT ====================*/
function logout() {
    $.ajax({
        url: friendlyURL("?module=login&op=logout"),
        type: 'POST',
        dataType: 'JSON'
    }).done(function (data) {
        console.log(data);
        localStorage.removeItem('token');
        window.location.href = friendlyURL("?module=home&op=view");
    }).fail(function (e) {
        console.log(e);
    });
}

/*==================== AJAX PROMISE ====================*/
function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        });
    });
}

/*==================== FRIENDLY URL ====================*/
function friendlyURL(url) {
    // console.log(url);
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
        cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
            link += "/" + aux[1] + "/";
        } else {
            link += "/" + aux[1];
        }
    }
    return "http://localhost/Framework_PHP_OO_MVC" + link;
}


$(document).ready(function () {
    load_menu();
    click_logout();
});