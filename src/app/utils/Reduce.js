(function() {
	
	var instance = {
		add: function(p, v) {
			p.players.push(v);
			p.total += v.goals;
			return p;
		},
	
		remove: function(p, v) {
			p.players.splice(p.players.indexOf(v), 1);
			p.total -= v.goals;
			return p;
		},

		initial: function() {
			return Em.Object.extend({
				total:0,
				players: []
			}).create();
		}
	};
	
	window.Reduce = instance;
	
})();