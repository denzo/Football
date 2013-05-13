/**
 * @author deniss.alimovs@gmail.com
 */

//inject the contents of the jshint.js file into this scope
var success = phantom.injectJs(phantom.args[0]);

(function (p) {
    "use strict";
    
    if (typeof p.args[1] === 'undefined')
    {
    	console.log('Please provide a string of paths to js files separated by comma as a phantom.args[1]');
	    p.exit(true);
	    return;
    }
    
	// catch a comma separated paths to files to be jshinted
	var jsFileList = p.args[1].split(',');
	
    //load filesystem module
    var fs = require('fs');
    
    // error
    var error = false;
	
	while (jsFileList.length)
	{
		var jsFile = jsFileList.pop();
		
	    if (!fs.isReadable(jsFile))
	    {
	        console.log('unreadable file');
	        error = true; //failure
	        break;
	    }
	
	    //see http://www.jshint.com/about/ for an explanation on the use of JSHint
	    //read the contents of the js file and pass it to the JSHINT function
	    var result = JSHINT(fs.read(jsFile));
	
	    if (JSHINT.errors.length > 0)
	    {
	    	console.log('read: ' + jsFile + ' ! ' + JSHINT.errors.length + (JSHINT.errors.length > 1 ? ' errors' : ' error'));
	        for (var i = 0, n = JSHINT.errors.length; i < n; i++)
	        {
	        	// do not go further than displaying 15 errors
	        	// as phantom.js hangs
	        	if (i > 15)
	        	{
	        		console.log('...and there are other ' + (JSHINT.errors.length - i) + ' errors');
	        		break;
	        	}
	        
	            var error = JSHINT.errors[i];
	            console.log([
	            	' -',
	                'line ' + error.line + '[' + error.character + ']',
	                error.reason
	            ].join(' '));
	        }
	        error = true; // failure
	        break;
	    }
	    else
	    {
	    	// console.log('read: ' + jsFile + ' ');
	    }
	}
	
	p.exit(error); //success
		
}(phantom));