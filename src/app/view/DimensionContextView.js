App.DimensionContextView = Em.View.extend({
	
	
	templateName: 'dimension-context',
	elementId: 'dimensionContextMenu',
	tagName: 'table',
	
	classNames: ['popover', 'top'],
	
	
	classNameBindings: ['show:show:hide'],
	
	didInsertElement: function()
	{
		var that = this;
	
		this.$('.split-menu').on('click', function(event)
		{
			var controller = that.get('controller');
		
			var filters = controller.get('filterList.content').getEach('value').concat(that.get('data.title'));
		
			controller.send('updateDimensionContextMenu');
			controller.send('updateFilter', filters);
			controller.send('createDimensionBreakdown', $(event.target).text().toLowerCase());
		});
	},
	
	// DimensionBreakdownModel
	data: null,
	
	show: function()
	{
		return Boolean(this.get('data'));
	}.property('data'),
	
	pageXChangeHandler: function()
	{
	
	}.observes('pageX')
	
	
});