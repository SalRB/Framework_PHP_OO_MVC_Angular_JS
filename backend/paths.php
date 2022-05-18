<?php
define('PROJECT', '/Framework_PHP_OO_MVC_ANGULAR_JS/backend/');

//SITE_ROOT
define('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'] . PROJECT);

//SITE_PATH
define('SITE_PATH', 'http://' . $_SERVER['HTTP_HOST'] . PROJECT);

//PRODUCTION
define('PRODUCTION', true);

//MODEL
define('MODEL_PATH', SITE_ROOT . 'model/');

//MODULES
define('MODULES_PATH', SITE_ROOT . 'modules/');

//RESOURCES
define('RESOURCES', SITE_ROOT . 'resources/');

//UTILS
define('UTILS', SITE_ROOT . 'utils/');

//VIEW
define('VIEW_PATH_INC', SITE_ROOT . 'views/inc/');

//CSS
define('CSS_PATH', SITE_ROOT . 'views/css/');

//JS
define('JS_PATH', SITE_ROOT . 'views/js/');

//IMG
define('IMG_PATH', SITE_ROOT . 'views/img/');

//MODEL_HOME
define('UTILS_HOME', SITE_ROOT . 'modules/home/utils/');
define('DAO_HOME', SITE_ROOT . 'modules/home/model/DAO/');
define('BLL_HOME', SITE_ROOT . 'modules/home/model/BLL/');
define('MODEL_HOME', SITE_ROOT . 'modules/home/model/model/');
define('JS_VIEW_HOME', SITE_PATH . 'modules/home/view/js/');
define('VIEW_PATH_HOME', SITE_ROOT . 'modules/home/view/');

//MODEL_SHOP
define('UTILS_SHOP', SITE_ROOT . 'modules/shop/utils/');
define('DAO_SHOP', SITE_ROOT . 'modules/shop/model/DAO/');
define('BLL_SHOP', SITE_ROOT . 'modules/shop/model/BLL/');
define('MODEL_SHOP', SITE_ROOT . 'modules/shop/model/model/');
define('JS_VIEW_SHOP', SITE_PATH . 'modules/shop/view/js/');
define('VIEW_PATH_SHOP', SITE_ROOT . 'modules/shop/view/');

//MODEL_CONTACT
define('MODEL_CONTACT', SITE_ROOT . 'modules/contact/model/model/');
define('JS_VIEW_CONTACT', SITE_PATH . 'modules/contact/view/js/');
define('VIEW_PATH_CONTACT', SITE_ROOT . 'modules/contact/view/');

//MODEL_CART
define('UTILS_CART', SITE_ROOT . 'modules/cart/utils/');
define('DAO_CART', SITE_ROOT . 'modules/cart/model/DAO/');
define('BLL_CART', SITE_ROOT . 'modules/cart/model/BLL/');
define('MODEL_CART', SITE_ROOT . 'modules/cart/model/model/');
define('JS_VIEW_CART', SITE_PATH . 'modules/cart/view/js/');
define('VIEW_PATH_CART', SITE_ROOT . 'modules/cart/view/');

//MODEL_LOGIN
define('UTILS_LOGIN', SITE_ROOT . 'modules/login/utils/');
define('DAO_LOGIN', SITE_ROOT . 'modules/login/model/DAO/');
define('BLL_LOGIN', SITE_ROOT . 'modules/login/model/BLL/');
define('MODEL_LOGIN', SITE_ROOT . 'modules/login/model/model/');
define('JS_VIEW_LOGIN', SITE_PATH . 'modules/login/view/js/');
define('VIEW_PATH_LOGIN', SITE_ROOT . 'modules/login/view/');

//MODEL_SEARCH
define('DAO_SEARCH', SITE_ROOT . 'modules/search/model/DAO/');
define('BLL_SEARCH', SITE_ROOT . 'modules/search/model/BLL/');
define('MODEL_SEARCH', SITE_ROOT . 'modules/search/model/model/');
define('JS_VIEW_SEARCH', SITE_PATH . 'modules/search/view/js/');


// Friendly
define('URL_FRIENDLY', TRUE);
