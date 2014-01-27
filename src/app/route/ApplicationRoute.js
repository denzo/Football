App.ApplicationRoute = Em.Route.extend({

	setupController: function() {
		var that = this;
			that.initApp(Fake.get(this.get('totalRecords')));
	
	},
	
	initApp: function(data) {
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
		
	}
	
	
});