function openModalLogin(type){
    if (type == 'login') {
        $('#login_registr #reg').removeClass('active');
        $('#login_registr .right').removeClass('active');
        $('#login_registr #forgot').removeClass('active');
        $('#login_registr #vk_tab').removeClass('active');

        $('#login_registr #log').addClass('active');
        $('#login_registr .left').addClass('active');
    }
    if (type == 'reg') {
        $('#login_registr #log').removeClass('active');
        $('#login_registr .left').removeClass('active');
        $('#login_registr #forgot').removeClass('active');
        $('#login_registr #vk_tab').removeClass('active');

        $('#login_registr #reg').addClass('active');
        $('#login_registr .right').addClass('active');
    }
    $('#login_registr').modal('show');
}
function getModalForgot(){
    $('#login_registr #reg').removeClass('active');
    $('#login_registr #log').removeClass('active');
    $('#login_registr .right').removeClass('active');
    $('#login_registr .left').removeClass('active');
    $('#login_registr #forgot').addClass('active');
}


//Пагинации вкладки медиа файлов
function paginAllNews(page){
    $('#pagin_news input[name=page]').val(page);
    var form = $('#pagin_news');

    form = form.serialize();

    $.ajax({
        url: "/betting?page="+$('#pagin_news input[name=page]').val(),
        type: 'post',
        data: form,
        context: document.body
    }).done(function (e) {
        $('.news_list').html($(e).find('.news_list .item'));
        $('.all-news').html($(e).find('.all-news li'));

        var stateObj = { foo: "test" };
        history.pushState(stateObj, "test", "/betting?page="+$('#pagin_news input[name=page]').val());
        $(window).scrollTop(0);

    });
}
$('.nav-tabs a').click(function(){
    var tab = $(this).attr('href').replace('#', '');
    var stateObj = { foo: "test" };
    history.pushState(stateObj, "test", "personal?tab="+tab);
});

function sortRef(){
    var form = $('#filter-partner-stat');

    form = form.serialize();

    $.ajax({
        url: "/personal?tab=partner",
        type: 'post',
        data: form+'&sortRef=1',
        context: document.body
    }).done(function (e) {
        $('#ref-table tbody').html($(e).find('#ref-table tbody tr'));
    });
}


function CopyToClipboard(containerid) {
    window.getSelection().removeAllRanges();
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("Copy");
        window.getSelection().removeAllRanges();

    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("Copy");
        window.getSelection().removeAllRanges();
    }
}

function getModalForgot(){
    $('#login_registr #reg').removeClass('active');
    $('#login_registr #log').removeClass('active');
    $('#login_registr .right').removeClass('active');
    $('#login_registr .left').removeClass('active');
    $('#login_registr #forgot').addClass('active');
}
function getModalVk(){
    $('#login_registr #reg').removeClass('active');
    $('#login_registr #log').removeClass('active');
    $('#login_registr .right').removeClass('active');
    $('#login_registr .left').removeClass('active');
    $('#login_registr #vk_tab').addClass('active');
}



$(document).ready(function(){
    VK.init({apiId: 6055524});
    VK.Widgets.Auth("vk_auth", {width: "300px", authUrl: '/vkauth/auth/?'});
});


window.fbAsyncInit = function() {
FB.init({
  appId      : '276550962941366',
  cookie     : true,
  xfbml      : true,
  version    : 'v3.1'
});
  
FB.AppEvents.logPageView();   
  
};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "https://connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    if (response.status === 'connected') {
        FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name);
        });
    } else {

    }
}
function fb_login(){
    FB.getLoginStatus(function(response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            $.ajax({
                url: "/fbauth/auth/",
                type: 'post',
                    data: '_csrf='+csrf_tarif+'&uid='+FB.getAuthResponse()['userID']+'&name='+response.name,
                    context: document.body
            }).done(function (e) {});
        } else {
            console.log('Юзер был не залогинен в самом ФБ, запускаем окно логинизирования');
            FB.login(function(response){
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');

                } else {
                    console.log('Походу пользователь передумал логиниться через ФБ');
                }
            });
        }
    }, {
        scope: 'email,id'
    });
}