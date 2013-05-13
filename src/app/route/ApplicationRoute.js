App.ApplicationRoute = Em.Route.extend({

	activate: function()
	{
		
	},
	
	setupController: function()
	{
		var that = this;
	
		// use generated fake data if specified in the URL
		if (window.location.href.indexOf('fake') > -1)
		{
			that.initApp(Fake.get(this.get('totalRecords')));
		}
		else
		{
			d3.csv('data/activity.csv', function(result)
			{
				var maxDate = null;
			
				result.forEach(function(item)
				{
					item.leads = +item.leads;
					item.campaign = item.campaign === '?' ? 'No campaign id' : item.campaign;
					item.selection_date = Date.parseExact(item.selection_date, 'd/MM/yyyy');
					
					if (maxDate === null || item.selection_date.isAfter(maxDate))
						maxDate = item.selection_date;
				});
				
				that.set('controller.maxDate', maxDate.getDay() !== 0 ? maxDate.moveToDayOfWeek(0) : maxDate);
				
				that.initApp(result);
			});
		}
	},
	
	initApp: function(data)
	{
		var controller = this.controller;
		
		controller.set('content', data);
		
		controller.crossfilter.add(data);
		
		
		var cf = controller.crossfilter;
		
		
		var team = cf.dimension(function(d){ return d.team; });
		var opponent = cf.dimension(function(d){ return d.opponent; });
		var date = cf.dimension(function(d){ return d.date; });
		var dateGroup = date.group().reduce(Reduce.add, Reduce.remove, Reduce.initial).all();
		
		var series = team.group().all().getEach('key').map(function(d)
		{
			team.filter(d);
			var goalsFor = dateGroup.map(function(d){ return {date: d.key, total: d.value.total, players: d.value.players.concat()}; });
			team.filterAll();
			
			opponent.filter(d);
			var goalsAgainst = dateGroup.map(function(d){ return {date: d.key, total: d.value.total, players: d.value.players.concat()}; });
			opponent.filterAll();
			
			return {
				team: d,
				gf: goalsFor,
				ga: goalsAgainst
			};
		});
		
		this.set('controller.breakdown.content', series);
		
	},
	
	
	
	
	
	
	events: {
	
		
		
	}

});