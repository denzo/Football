/**
 * @author deniss.alimovs@gmail.com
 */

//inject the contents of the jshint.js file into this scope
var success = phantom.injectJs(phantom.args[0]);

(function (p) {
    "use strict";
    
    console.log(p.args[1]);
    p.exit(true);
    
    //load filesystem module
    var fs = require('fs');

	// catch a comma separated paths to files to be jshinted
	var jsFileList = p.args[1].split(',');
	
	while (jsFileList.length)
	{
		var jsFile = jsFileList.pop();
		
	    if (!fs.isReadable(jsFile))
	    {
	        console.log('unreadable file');
	        p.exit(true); //failure
	    }
	
	    //see http://www.jshint.com/about/ for an explanation on the use of JSHint
	    //read the contents of the js file and pass it to the JSHINT function
	    var result = JSHINT(fs.read(jsFile));
	
	    if (JSHINT.errors.length > 0)
	    {
	    	console.log('read: ' + jsFile + ' ! ' + JSHINT.errors.length + (JSHINT.errors.length > 1 ? ' errors' : ' error'));
	        for (var i = 0, n = JSHINT.errors.length; i < n; i++)
	        {
	            var error = JSHINT.errors[i];
	            console.log([
	            	' -',
	                'line ' + error.line + '[' + error.character + ']',
	                error.reason
	            ].join(' '));
	        }
	        p.exit(true); //failure
	    }
	    else
	    {
	    	console.log('read: ' + jsFile + ' ');
	    }
	}
	
	p.exit(false); //success

}(phantom));