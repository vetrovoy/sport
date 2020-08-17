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

function timeExpress(timestamp){
    if (timestamp < 0) timestamp = 0;

    var hour = Math.floor(timestamp/3600);
    var mins = Math.floor((timestamp - hour*60*60)/60);
    var secs = Math.floor(timestamp - hour*60*60 - mins*60);

    $('#head-express-h').text(hour);
    $('#express-h').text(hour);

    if(String(mins).length > 1) {
        $('#head-express-m').text(mins);
        $('#express-m').text(mins);
    }
    else {
        $('#head-express-m').text("0" + mins);
        $('#express-m').text("0" + mins);
    }
    if(String(secs).length > 1) {
        $('#head-express-s').text(secs);
        $('#express-s').text(secs);
    }
    else {
        $('#head-express-s').text("0" + secs);
        $('#express-s').text("0" + secs);
    }

}

function timeReliable(timestamp){
    if (timestamp < 0) timestamp = 0;

    var hour = Math.floor(timestamp/3600);
    var mins = Math.floor((timestamp - hour*60*60)/60);
    var secs = Math.floor(timestamp - hour*60*60 - mins*60);

    $('#reliable-time-h').text(hour);

    if(String(mins).length > 1) {
        $('#reliable-time-m').text(mins);
    }
    else {
        $('#reliable-time-m').text("0" + mins);
    }
    if(String(secs).length > 1) {
        $('#reliable-time-s').text(secs);
    }
    else {
        $('#reliable-time-s').text("0" + secs);
    }

}


function timeAlltariff(timestamp){
    if (timestamp < 0) timestamp = 0;

    var hour = Math.floor(timestamp/3600);
    var mins = Math.floor((timestamp - hour*60*60)/60);
    var secs = Math.floor(timestamp - hour*60*60 - mins*60);

    $('#alltariff-time-h').text(hour);

    if(String(mins).length > 1) {
        $('#alltariff-time-m').text(mins);
    }
    else {
        $('#alltariff-time-m').text("0" + mins);
    }
    if(String(secs).length > 1) {
        $('#alltariff-time-s').text(secs);
    }
    else {
        $('#alltariff-time-s').text("0" + secs);
    }

}


$(document).ready(function(){
    setInterval(function(){
        expressTime = expressTime - 1;
        timeExpress(expressTime);
        if(expressTime <= 600){

            $.ajax({
                url: "/newoffers/newexpress",
                type: 'post',
                data: '_csrf='+csrf_tarif,
                context: document.body
            }).done(function (e) {
                var newExpress = JSON.parse(e);

                expressTime = newExpress.time.diff;

                $('#header-express-ver').text('Вероятность прохода '+newExpress.ver+'%');
                $('#header-express-coeff').text(newExpress.coeff);
                $('#header-express-proffit').text(newExpress.proffit+'%/'+newExpress.proffit+'$');


                $('#express-ver').text('Проходимость '+newExpress.ver+'%');
                $('#express-start').text(newExpress.start);
                $('#express-coeff').text(newExpress.coeff);
                $('#express-proffit').text(newExpress.proffit+'% или '+newExpress.proffit+'$');


            });
        }


        reliableTime = reliableTime - 1;
        timeReliable(reliableTime);
        if(reliableTime <= 600){

            $.ajax({
                url: "/newoffers/newreliable",
                type: 'post',
                data: '_csrf='+csrf_tarif,
                context: document.body
            }).done(function (e) {
                var newReliable = JSON.parse(e);

                reliableTime = newReliable.time.diff;

                 $('#reliable-ver').text('Проходимость '+newReliable.ver+'%');
                 $('#reliable-time').text(newReliable.start);
                 $('#reliable-coeff').text(newReliable.coeff);
                 $('#reliable-proffit').text(newReliable.proffit+'% или '+newReliable.proffit+'$');


            });

        }


        allTariffTime = allTariffTime - 1;
        timeAlltariff(allTariffTime);
        if(allTariffTime <= 600){

            $.ajax({
                url: "/newoffers/newalltariff",
                type: 'post',
                data: '_csrf='+csrf_tarif,
                context: document.body
            }).done(function (e) {
                 var newAllTariff = JSON.parse(e);

                    allTariffTime = newAllTariff.time.diff;

                    $('#all-tariff-time').text(newAllTariff.start);
                    $('#all-tariff-coeff').text(newAllTariff.coeff);
                    $('#all-tariff-proffit').text(newAllTariff.proffit+'% / '+newAllTariff.proffit+'$');


            });

        }


    }, 1000);
});


function calc_proffit() {
    setTimeout(function () {
        var proffitVal = $('#calc-proffit-val').val();
        if (!isNaN(proffitVal)){
            $('#error-calc').text('');
            var calcTypeTariff = $('#calc-proffit-type').val();
            if (calcTypeTariff == 1){
                $.ajax({
                    url: "/newoffers/newalltariff",
                    type: 'post',
                    data: '_csrf='+csrf_tarif,
                    context: document.body
                }).done(function (e) {
                    var tarifCalc = JSON.parse(e);

                    var calcCoeff = tarifCalc.coeff;

                    var summ  = Math.floor(proffitVal*calcCoeff-proffitVal);

                    if (!isNaN(summ)) {
                        $('#btn-profit').removeClass('disable_link').attr('onclick',"openModalPay('all');");
                        $('#calc-summ-proffit').text(summ+'$');
                    } else {
                        $('#btn-profit').addClass('disable_link');
                        $('#calc-summ-proffit').text('');
                    }


                });
            }
            if (calcTypeTariff == 2){
                $.ajax({
                    url: "/newoffers/newreliable",
                    type: 'post',
                    data: '_csrf='+csrf_tarif,
                    context: document.body
                }).done(function (e) {
                    var tarifCalc = JSON.parse(e);

                    var calcCoeff = tarifCalc.coeff;

                    var summ  = Math.floor(proffitVal*calcCoeff-proffitVal);

                    if (!isNaN(summ)) {
                        $('#btn-profit').removeClass('disable_link').attr('onclick',"openModalPay('reliable');");
                        $('#calc-summ-proffit').text(summ+'$');
                    } else {
                        $('#btn-profit').addClass('disable_link');
                        $('#calc-summ-proffit').text('');
                    }


                });
            }
            if (calcTypeTariff == 3){
                $.ajax({
                    url: "/newoffers/newexpress",
                    type: 'post',
                    data: '_csrf='+csrf_tarif,
                    context: document.body
                }).done(function (e) {
                    var tarifCalc = JSON.parse(e);

                    var calcCoeff = tarifCalc.coeff;

                    var summ  = Math.floor(proffitVal*calcCoeff-proffitVal);

                    if (!isNaN(summ)) {
                        $('#btn-profit').removeClass('disable_link').attr('onclick',"openModalPay('express');");
                        $('#calc-summ-proffit').text(summ+'$');
                    } else {
                        $('#btn-profit').addClass('disable_link');
                        $('#calc-summ-proffit').text('');
                    }


                });
            }

        }else{
            $('#error-calc').text('Введите число');
            $('#btn-profit').addClass('disable_link');
            $('#calc-summ-proffit').text('');
        }
    },200);
}
function selectTarif(type){
    if (type == 'month') {
        $('#tarif_price .price .new_price').html('33 000₽');
        $('#tarif_price .price .old_price').html('45 000₽');
        $('#tarif_price .pay').attr('onclick',"openModalPay('month');");
    }
    if (type == 'week') {
        $('#tarif_price .price .new_price').html('8 000₽');
        $('#tarif_price .price .old_price').html('10 000₽');
        $('#tarif_price .pay').attr('onclick',"openModalPay('week');");
    }

}

function changeTable(item){
    if($(item).prop( "checked" )){
        $('#summ_proffit_1').css('display','none');
        $('#tbody_1').css('display','none');
        $('#summ_proffit_2').css('display','block');
        $('#tbody_2').css('display','table-row-group');
    } else {
        $('#summ_proffit_2').css('display','none');
        $('#tbody_2').css('display','none');
        $('#summ_proffit_1').css('display','block');
        $('#tbody_1').css('display','table-row-group');
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

function openModalPay(tarrif) {
    var link_free = '/payment/pay?tarif='+tarrif;


    var link_inter = '/payment/interkassa/pay?tarif='+tarrif;

    $('#paymodal').modal('show');

    $('#pay-free').attr('href',link_free);

    $('#pay-inter').attr('href',link_inter);

}