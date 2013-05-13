(function() {
	
	var random = {
		name: function()
		{
			return Random.get(['Antonette','Tarra','Twana','Kenton','Caitlyn','Lonny','Chadwick','Jenny','Alanna','Jenise','Rena','Yolando','Son','Abdul','Brandon','Brittany','Bonita','Troy','Nevada','Georgia','Lorie','Birgit','Neida','Tonita','Colette','Lashawn','Bobette','Clint','Sana']);
		},
		surname: function()
		{
			return Random.get(['Callas','Plewa','Leone','Geib','Eatman','Arthur','Mullinix','Nickson','Gosney','Poitra','Delbosque','Strunk','Nebel','Kromer','Kravitz','Bazan','Coram','Francis','Blumberg','Bever','Hopper','Nolan','Mohl','Fulk','Straight','Armijo','Kaye','Aubuchon','Glandon','Shoaf']);
		},
		get: function(items)
		{
			return items[Math.floor(Math.random()*items.length)];
		},
		invite: function()
		{
			var name = Random.name();
			var surname = Random.surname();
			return {
				first_name: name,
				last_name: surname,
				email: name.toLowerCase() + '.' + surname.toLowerCase() + '@supahotemail.com'
			};
		},
		number: function(min, max)
		{
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		fromArray: function(array)
		{
			return array[Random.number(0, array.length - 1)];
		}
	};
	
	window.Random = random;
	
})();