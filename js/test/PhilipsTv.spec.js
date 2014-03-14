describe('PhilipsTV Suite', function() {
	"use strict";

	var tv;

	beforeEach(function() {
		jasmine.Ajax.install();
		tv = new PhilipsTv();
	});

	afterEach(function() {
		jasmine.Ajax.uninstall();
	});

	it('should connect to a host', function() {
		var host ='192.168.178.34';
		expect(tv.connect(host)).toBe(true);
	});
});
