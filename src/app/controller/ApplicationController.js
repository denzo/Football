App.ApplicationController = Em.ArrayController.extend({

	crossfilter: crossfilter(),
	
	breakdown: Em.ArrayController.create(),
	
	maxDate: null
	
});