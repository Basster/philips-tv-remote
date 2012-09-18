/**
 * Created with JetBrains PhpStorm.
 * User: basster
 * Date: 18.09.12
 * Time: 00:47
 * To change this template use File | Settings | File Templates.
 */

function PhilipsTv(host) {

    EventTarget.call(this);

    this.port = 1925;
    this.hostName = host;
    this.connected = false;
    this.systemInfos = null;

    this.commands = [
        { name: 'get_ambilight_topology', method: 'GET', queryString: 'ambilight/topology'},
        { name: 'get_ambilight_mode', method: 'GET', queryString: 'ambilight/mode'},
        { name: 'post_ambilight_mode', method: 'POST', queryString: 'ambilight/mode'}
    ];

    this.pollTimer = 1000;
    var instance = this;

    this.connectionInterval = window.setInterval(function() { instance.updateSystemInfo() }, this.pollTimer);
}

PhilipsTv.prototype = new EventTarget();
PhilipsTv.prototype.constructor = PhilipsTv;

PhilipsTv.prototype.getCommand = function(commandName) {

    for (var i = 0; i < this.commands.length; i++) {
        if (this.commands[i].name === commandName) {
            return this.commands[i];
        }
    }

    throw new Error('Command "' + commandName + '" not found!');
}

PhilipsTv.prototype.getBaseUrl = function() {
    return 'http://' + this.hostName + ':' + this.port + '/1/';
}

PhilipsTv.prototype.updateSystemInfo = function() {
    var url = this.getBaseUrl() + 'system';
    var instance = this;

    $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
            console.log(data);

            // set connected status
            instance.connected = true;

            // set device attributes
            instance.systemInfos = data;

            window.clearInterval(instance.connectionInterval);
            instance.connectionInterval = null;

            instance.fire('CONNECTION_SUCCESS');
        },
        error: function (data) {
            instance.connected = false;
            instance.fire('CONNECTION_LOST');
        }
    });
}

PhilipsTv.prototype.resetSystemInfos = function() {
    this.systemInfos = null;
}
