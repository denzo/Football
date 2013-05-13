Ember.Handlebars.registerBoundHelper('prettyDate', function(value) {
	if (value === null)
		return 'no date provided';
	return value.toString('dd MMM, yyyy');
});