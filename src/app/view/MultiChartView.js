App.MultiChartView = Em.View.extend({

	tagName: 'svg',
	data: null, /* Em.ArrayController */
	
	attributeBindings: ['height'],
	
	height: 0,
	
	chartWidth: null,
	
	maxValues: [],
	chartHeights: [],
	
	config: {
		margin: {top: 100, right: 50, bottom: 40, left: 50},
		size: {radius: 2},
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
				d3.max(team.gf.getEach('total'))
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
			chartWidth = data[0].gf.length * (config.size.radius * 2 + config.gap.horizontal) + config.size.radius;
			
		
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
			.attr('y', function(d,i){ return d3.sum(chartHeights.slice(0, i + 1)); })
			.text(function(d){ return d.team; });
			
		title
			.exit()
			.remove();
			
			
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
		
		
		var goalsFor = chart.selectAll('g.goalsFor').data(function(d){
			return d.gf;
		});
		
		goalsFor
			.enter()
			.append('g')
			.attr('class', 'goalsFor');
		
		goalsFor
			.attr('transform', function(d, i){ 
				return SVG.translate(i * (config.gap.horizontal + config.size.radius * 2) + config.size.radius, 0);
			})
			.attr('total', function(d){ return d.total; });
			
		goalsFor
			.exit()
			.remove();
		
		
		
		var bar = goalsFor.selectAll('circle').data(function(d){
			return d.players;
		});
		
		bar
			.enter()
			.append('circle');
			
		bar
			.attr('cy', function(d, i, j, k)
			{
				return this.parentNode.parentNode.getAttribute('chart-height') - 
					i * (config.size.radius * 2 + config.gap.vertical) - 
					config.size.radius;
			})
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
			.attr('r', config.size.radius);
			
		bar
			.exit()
			.remove();
			
			
		var goalsAgainst = chart.selectAll('g.goalsAgainst').data(function(d){
			return d.ga;
		});
		
		goalsAgainst
			.enter()
			.append('g')
			.attr('class', 'goalsAgainst');
		
		goalsAgainst
			.attr('transform', function(d, i){ 
				return SVG.translate(
					i * (config.gap.horizontal + config.size.radius * 2) + config.size.radius, 
					Number(this.parentNode.getAttribute('chart-height')) + config.gap.vertical * 2 + config.size.radius * 2);
			})
			.attr('total', function(d){ return d.total; });
			
		goalsAgainst
			.exit()
			.remove();
		
		
		
		var bar2 = goalsAgainst.selectAll('circle').data(function(d){
			return d.players;
		});
		
		bar2
			.enter()
			.append('circle');
			
		bar2
			.attr('cy', function(d, i, j, k)
			{
				return i * (config.size.radius * 2 + config.gap.vertical) + config.size.radius;
			})
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
					return '#292929';
				} 
			})
			.attr('r', config.size.radius);
			
		bar2
			.exit()
			.remove();
	}

});