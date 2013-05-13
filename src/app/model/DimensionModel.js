App.DimensionModel = Em.Object.extend({

	// name of the dimension, for example 'channel'
	name: null,
	
	// an instance of crossfilter dimension
	value: null,
	
	// a flat array of all unique values of the dimension
	// for example if the name of the dimension is 'channel'
	// the values will be 'mail', 'online', 'branch' etc.
	all: null 


});