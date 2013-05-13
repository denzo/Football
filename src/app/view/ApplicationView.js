App.ApplicationView = Em.View.extend({

	didInsertElement: function()
	{
		var that = this;
	
		this.set('isRendered', true);
		
		$('#filter').chosen();
		
	},
	
	splitChangeHandler: function()
	{
		if (this.get('isRendered'))
		{
			var split = this.get('controller.split');
			if (split)
				split = split.replace(/\b[a-z]/g, function(letter) { return letter.toUpperCase(); });
			
			this.$('#split-options button').removeClass('active');
			this.$('#split-options button:contains(' + split + ')').addClass('active');
		}
	}.observes('controller.split'),
	
	leadsSliderChangeHandler: function(event, ui)
	{
		this.get('controller').send('updateLeadsRange', [ui.values[0], ui.values[1]]);
	},
	
	timeSliderChangeHandler: function(event, ui)
	{
		this.get('controller').send('updateTimeRange', [ui.values[0], ui.values[1]]);
	},
	
	dimensionsChangeHandler: function()
	{
		// force DOM update
		this.rerender();
		// notify Chosen component of it's content update
		$('#filter').trigger('liszt:updated');
	}.observes('controller.dimensions.@each'),
	
	filterListChangeHandler: function()
	{
		
	}.observes('controller.filterList.@each'),
	
	
	change: function()
	{
		
	}

});