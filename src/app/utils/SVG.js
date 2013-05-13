(function() {
	
	var instance = {
		translate: function(x, y)
		{
			return 'translate(' + Math.round(x) + ',' + Math.round(y) + ')';
		}
	};
	
	window.SVG = instance;
	
})();