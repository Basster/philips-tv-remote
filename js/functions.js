/**
 * Created with JetBrains PhpStorm.
 * User: basster
 * Date: 18.09.12
 * Time: 00:12
 * To change this template use File | Settings | File Templates.
 */

var port = 1925;

function getHostName() {
    return $('#hostname').val();
}

function getTVHost() {
    return 'http://' + getHostName() + ':' + port;
}

function queryChannelName() {

    var curl = getTVHost() + '/1/channels' ;

    $.ajax({
        url: curl,
        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
}