App.IssuesController = Em.ArrayController.extend({

	content: [],
	
	isLoaded: false,
	
	load: function()
	{
		if (!this.get('isLoaded'))
			this.send('getIssueList');
		return this;
	}
	
});