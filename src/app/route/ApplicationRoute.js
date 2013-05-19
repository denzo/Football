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
		
		var series = team.group().all().getEach('key').map(function(teamName)
		{
			var matches = dateGroup.map(function(item)
			{
				date.filter(date);
				
				team.filter(teamName);
				var goalsFor = item.value.players.concat();
				team.filterAll();
				
				opponent.filter(teamName);
				var goalsAgainst = item.value.players.concat();
				opponent.filterAll();
				
				return {
					date: item.key,
					gf: goalsFor,
					ga: goalsAgainst,
					totalFor: goalsFor.length,
					totalAgainst: goalsAgainst.length,
					total: goalsFor.length + goalsAgainst.length,
					outcome: goalsFor.length === goalsAgainst.length ? 
						'draw' : goalsFor.length > goalsAgainst.length ? 'win' : 'loss'
				};
				
			});
			
			return {
				team: teamName,
				matches: matches,
				maxGoalsFor: d3.max(matches.getEach('totalFor')),
				maxGoalsAgainst: d3.max(matches.getEach('totalAgainst'))
			};
		});
		
		this.set('controller.breakdown.content', series);
		
	},
	
	
	
	
	
	
	events: {
	
		
		
	}

});