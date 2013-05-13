(function() {
	
	var instance = {
		dateShort: function(date)
		{
			return date.toString('dd MMM \'yy');
		},
		
		addDelimeters: function(nStr, sign)
		{
            if (!sign)
                  sign = ' ';
           
            nStr += '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                  x1 = x1.replace(rgx, '$1' + sign + '$2');
            }
            return x1 + x2;
		}
	};
	
	window.Format = instance;
	
})();