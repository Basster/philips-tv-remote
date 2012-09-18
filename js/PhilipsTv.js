/**
 * Created with JetBrains PhpStorm.
 * User: basster
 * Date: 18.09.12
 * Time: 00:47
 * To change this template use File | Settings | File Templates.
 */

function PhilipsTv(host) {
    this.port = 1925;
    this.hostName = host;
    this.connected = false;
    this.resetSystemInfos();
    this.commands = [
        { name: 'get_ambilight_topology', method: 'GET', queryString: 'ambilight/topology'},
        { name: 'get_ambilight_mode', method: 'GET', queryString: 'ambilight/mode'},
        { name: 'post_ambilight_mode', method: 'POST', queryString: 'ambilight/mode'}
    ];
}

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
    var url = this.getBaseUrl() + 'system' ;

    $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
            console.log(data);

            // set connected status
            this.connected = true;

            // set device attributes
            this.name = data.name;
            this.model = data.model;
            this.serialNumber = data.serialnumber

        },
        error: function (data) {
            this.connected = false;
        }
    });
}

PhilipsTv.prototype.resetSystemInfos = function() {
    this.name = "";
    this.serialNumber = "";
    this.model = "";
}