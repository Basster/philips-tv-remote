/**
 * Created with JetBrains PhpStorm.
 * User: basster
 * Date: 18.09.12
 * Time: 00:12
 * To change this template use File | Settings | File Templates.
 */

var tv = null;
var checkInterval = null;
var errCount = 0;

$(document).ready(function(){
    updateTV();
});

function updateTvHost() {
    tv = new PhilipsTv($('#hostname').val());
    // console.log(tv.getCommand('get_ambilight_topology'));
}

function updateTV() {
    updateTvHost();
    resetInterval();
    checkInterval = window.setInterval('checkTVConnection()', 5000);
}

function resetInterval() {
    console.log('reset Interval');

    if (checkInterval !== null) {
        window.clearInterval(checkInterval);
        checkInterval = null;
    }
}

function checkTVConnection() {
    console.log(errCount);
    if (tv.connected === true) {
        console.log('TV: ' + tv.name + " is connected!");
        errCount = 0;
    }
    else {
        console.log('No TV connected, try to get new system info');
        errCount++;
        if (errCount < 10) {
            tv.updateSystemInfo();
        }
        else {
            resetInterval();
        }
    }

}