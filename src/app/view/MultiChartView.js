App.MultiChartView = Em.View.extend({

	tagName: 'svg',
	data: null, /* Em.ArrayController */
	
	attributeBindings: ['height'],
	
	height: 0,
	
	chartWidth: null,
	
	maxValues: [],
	chartHeights: [],
	
	config: {
		margin: {top: 50, right: 50, bottom: 40, left: 50},
		size: {radius: 1},
		gap: {horizontal: 5, vertical: 1}
	},
	
	dataChangeHandler: function()
	{
		this.updateChart(this.get('data.content'));
	}.observes('data.content'),
	
	didInsertElement: function()
	{
		if (this.get('data.content').length > 0)
			this.updateChart(this.get('data.content'));
	},
	
	createMaxValues: function(data)
	{
		var result = [];
		
		data.forEach(function(team)
		{
			result.push(
				d3.max(team.matches.getEach('total'))
			);
		});
		
		return result;
	},
	
	updateChart: function(data)
	{
		if (this.get('state') !== 'inDOM') return;
		
		
		
		var that = this,
			config = this.get('config'),
			svg = d3.select('#' + this.$().attr('id')),
			chartWidth = data[0].matches.length * (config.size.radius * 2 + config.gap.horizontal) + config.size.radius;
			
		
		var maxValues = this.createMaxValues(data),
			chartHeights = maxValues.map(function(max){ return max * (config.size.radius + config.gap.vertical) + config.margin.top; });
		
		this.set('height', d3.sum(chartHeights));
		
		var chart = svg.selectAll('g.chart').data(data);
		
		chart
			.enter()
			.append('g')
			.attr('class', 'chart');
			
		chart
			.attr('transform', function(d, i){ return SVG.translate(0, d3.sum(chartHeights.slice(0, i))); })
			.attr('title', function(d,i){ return d.team; })
			.attr('chart-height', function(d,i){ return chartHeights[i]; })
			.attr('max-value', function(d,i){ return maxValues[i]; });
			
		chart
			.exit()
			.remove();
			
		
		var title = svg.selectAll('text.title').data(data);
		
		title
			.enter()
			.append('text')
			.attr('class', 'title');
			
		title
			.attr('x', chartWidth + 15)
			.attr('y', function(d,i){ return d3.sum(chartHeights.slice(0, i)); })
			.text(function(d){ return d.team; });
			
		title
			.exit()
			.remove();
			
			
			
			
		var match = chart.selectAll('g.match').data(function(d)
		{
			return d.matches;
		});
		
		match
			.enter()
			.append('g')
			.attr('class', 'match');
		
		match
			.attr('transform', function(d, i){ 
				return SVG.translate(i * (config.gap.horizontal + config.size.radius * 2) + config.size.radius, 0);
			})
			.attr('class', function(d){ return d.outcome; });
			
		match
			.exit()
			.remove();
			
			
			
			
			
		
		
		
		var gf = match.selectAll('circle.goalFor').data(function(d){
			return d.gf;
		});
		
		gf
			.enter()
			.append('circle')
			.attr('class', 'goalFor');
			
		gf
			.attr('cy', function(d, i)
			{
				return -i * (config.size.radius * 2 + config.gap.vertical) - 
					(config.size.radius * 2 + config.gap.vertical) - 
					config.gap.vertical;
			})
			.attr('r', config.size.radius);
			
		gf
			.exit()
			.remove();
			
			
		
		var ga = match.selectAll('circle.goalAgainst').data(function(d){
			return d.ga;
		});
		
		ga
			.enter()
			.append('circle')
			.attr('class', 'goalAgainst');
			
		ga
			.attr('cy', function(d, i)
			{
				return i * (config.size.radius * 2 + config.gap.vertical) + 
					(config.size.radius * 2 + config.gap.vertical) + config.gap.vertical;
			})
			.attr('r', config.size.radius);
			
		ga
			.exit()
			.remove();
			
			
		var nilAll = match.selectAll('circle.nillAll').data(function(d){
			return d.total === 0 ? [true] : [];
		});
		
		nilAll
			.enter()
			.append('circle')
			.attr('class', 'nilAll')
			.attr('r', config.size.radius);
			
		nilAll
			.exit()
			.remove();
			
	}
	
	
	/*
		var titleTotal = title.selectAll('tspan.titleTotal').data(function(d){return [d]; });
		
		titleTotal
			.enter()
			.append('tspan')
			.attr('class', 'titleTotal');
			
		titleTotal
			.text(function(d){
				var result = d.total(time, measure, timeLimit[time]);
				return result > 0 ?
					Format.addDelimeters(result, ',') :
					'';
			});
			
		titleTotal
			.exit()
			.remove();
		*/
		
		/*
		
		.attr('fill', function(d, i, j) { 
				
				var data = this.parentNode.parentNode.__data__;
				
				var index = j % data.gf.length;
				
				var gf = data.gf[index].total;
				var ga = data.ga[index].total;
				
				if (gf > ga)
				{
					return '#77FF00';
				}
				else if (ga > gf)
				{
					return '#292929'; // '#FC2D50';
				}
				else if (ga === gf)
				{
					return '#292929'; // '#FFC000';
				} 
			})
			
		*/

});