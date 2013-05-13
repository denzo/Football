App.DimensionBreakdownModel = Em.Object.extend({

	// the dimension value name
	// for example if a dimension is channel the the dimension breakdown
	// will consist of 'branch', 'online', 'mail' and this is what the title is
	title: null,
	
	
	// an array containing the result values after all the 
	// dimensions have been filtered
	result: null,
	
	
	// an instance of crossfilter	
	crossfilter: null,
	
	// an array of all the dimensions:DimensionModel that the result
	// can be filtered on
	dimensions: null,
	
	// an array of summaries (days, weeks, months)
	// each summary is a crossfilter dimension group
	series: null,
	
	total: function(time, measure, limit)
	{
		var result = this.get('series') // get the series array
			.findProperty('key', time) // find the appropriate series
			.value
			.slice(-limit)
			.getEach('value');
				
			if (measure === 'campaigns')
			{
				result = d3.merge(result.getEach(measure)).uniq().length;
			}
			else
			{
				result = d3.sum(result.map(function(item){ return item.total(measure); }));
			}
	
		return result;
		
	},
	
	
	
	totalComms: null,
	
	totalLeads: null,
	
	maxTotalLeads: null

});