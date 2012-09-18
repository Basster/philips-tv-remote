/**
 * Created with JetBrains PhpStorm.
 * User: basster
 * Date: 18.09.12
 * Time: 00:12
 * To change this template use File | Settings | File Templates.
 */

var tv = null;

$(document).ready(function(){
    updateTV();
});

function updateTvHost() {
    tv = new PhilipsTv($('#hostname').val());
    tv.addListener('CONNECTION_SUCCESS', function() {
        console.log('connection success!');
        console.log(tv.systemInfos);
    });

    tv.addListener('CONNECTION_LOST', function() {
        console.log('no connection!');
    });
}

function updateTV() {
    updateTvHost();
    // resetInterval();
    // checkInterval = window.setInterval('checkTVConnection()', 5000);
}

function setTvStatusDisplay(message) {
    $('#tv_status_display').html(message);
}