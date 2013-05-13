(function() {
	
	var instance = {
		get: function(p_total)
		{
			var result = [],
				data = Fake.teams(),
				teams = d3.keys(data),
				i = -1,
				team,
				players,
				opponent;
				
			var temp = {};
			
			var matches = Fake.matches(); 
			
			while (++i < 400)
			{
				team = Random.fromArray(teams);
				opponent = Random.fromArray(teams.without(team));
				
				var match = matches.find(function(item) { return (item.home === team && item.away === opponent); });
				
				result.push({
					index: i,
					team: team,
					opponent: opponent,
					player: Random.fromArray(data[team]),
					date: match.date,
					goals: 1
				});
				
			}
			
			return result;
		},
		
		matches: function()
		{
			var i = -1,
				teams = d3.keys(Fake.teams()),
				result = [];
				
			teams.forEach(function(team)
			{
				var opponents = teams.without(team);
				var dateIndexRange = d3.range(0, opponents.length, 1);
				
				opponents.forEach(function(opponent)
				{
					var match = result.find(function(item) { return (item.away === team && item.home === opponent); });
					var date;
					if (match)
					{
						date = match.date;
					}
					else
					{
						var dateIndex = Random.fromArray(dateIndexRange);
						dateIndexRange = dateIndexRange.without(dateIndex);
						date = Date.today().add(-dateIndex).days();
					}
					
					result.push({
						home: team,
						away: opponent,
						date: date
					});
					
				});
			});
			
			return result;
		},
		
		
		/*
		http://www.guardian.co.uk/football/2010/sep/01/premier-league-squad-lists
		
		var temp = [];
		jQuery("#article-body-blocks h2:contains('Arsenal')").nextUntil("p:contains('Under 21 players')").each(function(item){ temp.push(jQuery.trim(jQuery(this).text().replace(',', ' ').replace(/\d+/g, ''))) });
		temp
		*/
		
		teams: function()
		{
			return {
				"Manchester United": ["Van Der Sar Edwin", "Bebé", "Neville Gary", "Evra Patrice", "Evans Jonny", "Ferdinand Rio", "Brown Wes", "Anderson", "Berbatov Dimitar", "Rooney Wayne", "Giggs Ryan", "Park Ji-Sung", "Vidic Nemanja", "Carrick Michael", "Scholes Paul", "O'Shea John", "Fletcher Darren", "Valencia Luis Antonio", "Gibson Darron", "Kuszczak Tomasz", "De Laet Ritchie", "Hernández Javier", "Owen Michael", "Hargreaves Owen"],
				"Manchester City": ["Hart Joe", "Given Shay", "Taylor Stuart", "Logan Shaleum", "Richards Micah", "Zabaleta Pablo", "Kompany Vincent", "Boateng Jérôme", "Lescott Joleon", "Touré Kolo", "Bridge Wayne", "Kolarov Aleksandar", "Johnson Adam", "Barry Gareth", "Touré Yaya", "Vieira Patrick", "De Jong Nigel", "Milner James", "Johnson Michael", "Silva David", "Wright-Phillips Shaun", "Tevez Carlos", "Adebayor Emmanuel", "Santa Cruz Roque", "Jô"],
				"Chelsea": ["Cech Petr", "Ivanovic Branislav", "Cole Ashley", "Essien Michael", "Ramires", "Lampard Frank", "Benayoun Yossi", "Drogba Didier", "Mikel John Obi", "Malouda Florent", "Bosingwa Jose", "Zhirkov Yuri", "Ferreira Paulo", "Kalou Salomon", "Turnbull Ross", "Terry John", "Alex", "Anelka Nicolas", "Hilário Henrique"],
				"Arsenal": ["Almunia Manuel", "Arshavin Andrey", "Bendtner Nicklas", "Chamakh Marouane", "Clichy Gaël", "Denilson", "Diaby Abou", "Djourou Johan", "Eboué Emmanuel", "Fabianski Lukasz", "Fabregas Cesc", "Koscielny Laurent", "Mannone Vito", "Nasri Samir", "Rosicky Tomas", "Sagna Bacary", "Song Alex", "Van Persie Robin", "Vermaelen Thomas", "Squillaci Sébastien"],
				"Tottenham": ["Assou-Ekotto Benoît", "Bassong Sébastian", "Bentley David", "Corluka Vedran", "Crouch Peter James", "Cudicini Carlo", "Gomes Heurelho", "Dawson Michael", "Defoe Jermain", "Gallas William", "Huddlestone Tom", "Hutton Alan", "Jenas Jermaine", "Kaboul Younes", "Keane Robbie", "King Ledley", "Kranjcar Niko", "Lennon Aaron", "Modric Luka", "Naughton Kyle", "O'Hara Jamie", "Palacios Wilson", "Pavlyuchenko Roman", "Pletikosa Stipe", "Van Der Vaart Rafael"],
				"Everton": ["Hibbert Tony", "Baines Leighton", "Jagielka Phil", "Neville Phil", "Osman Leon", "Beckford Jermaine", "Cahill Tim", "Anichebe Victor", "Vaughan James", "Arteta Mikel", "Turner Iain", "Pienaar Steven", "Howard Tim", "Coleman Seamus", "Yakubu Ayegbeni", "Fellaini Marouane", "Mucha Jan", "Saha Louis", "Heitinga John", "Bilyaletdinov Diniyar", "Distin Sylvian"],
				"Liverpool": ["Jones Brad", "Johnson Glen", "Agger Daniel", "Aurélio Fábio", "Gerrard Steven", "Torres Fernando", "Cole Joe", "Jovanovic Milan", "Kyrgiakos Sotirios", "Rodríguez Maxi", "Kuyt Dirk", "Leiva Lucas", "Carragher Jamie", "Reina José", "Spearing Jay", "Darby Stephen", "Skrtel Martin", "Poulsen Christian", "Babel Ryan", "Konchesky Paul", "Meireles Raul"],
				"West Brom": ["Barnes Giles Gordon", "Bednar Roman", "Brunt Christopher", "Carson Scott Paul", "Cech Marek", "Cox Simon", "Dorrans Graham", "Fortuné Marc-Antoine", "Ibanez Tebar Pablo No", "Jara Gonzalo", "Kiely Dean", "Méïté Abdoulaye", "Miller Ishmael", "Morrison James", "Mulumbu Youssouf", "Myhill Glyn Oliver Yes", "Odemwingie Peter No", "Olsson Jonas No", "Reid Steven John Yes", "Scharner Paul", "Shorey Nicky", "Tamas Gabriel", "Thomas Jerome", "Tchoyi Somen", "Zuiverloon Gianni"],
				"West Ham": ["Green Robert", "Gabbidon Danny", "Spector Jonathan", "Parker Scott", "Cole Carlton", "Dyer Kieron", "Noble Mark", "Upson Matthew", "Barrera  Pablo", "Behrami Valon", "Ben Haim Ta", "Da Costa Manuel", "Faubert Julien", "Hitzlsperger Thomas", "Ilunga Herita", "Kovac Radoslav", "Mccarthy Benny", "Piquionne Frédéric", "Reid Winston", "Boa Morte Luis", "Obinna Victor", "Jacobsen Lars", "Boffin Ruud", "Hines Zavon", "Collison Jack"],
				"Stoke": ["Begovic Asmir", "Collins Daniel", "Delap Rory", "Etherington Matthew", "Higginbotham Daniel", "Huth Robert", "Nash Carlo", "Pennant Jermaine", "Pugh Daniel", "Shawcross Ryan", "Shotton Ryan", "Soares Thomas", "Tonge Michael", "Walters Jonathan", "Whelan Glenn", "Whitehead Dean", "Wilkinson Andrew", "Diao Salif", "Faye Abdoulaye", "Fuller Ricardo", "Gudjohnsen Eidur", "Jones Kenwyne", "Sorensen Thomas", "Sanli Tuncay", "Wilson Marc"],
				"Fulham": ["Schwarzer Mark", "Stockdale David", "Pantsil John", "Stoor Frederick", "Kelly Stephen", "Gera Zoltan", "Dempsey Clint", "Riise Bjorn Helge", "Hughes Aaron", "Baird Christopher", "Halliche Rafik", "Etuhu Dickson", "Dikgacoi Kagisho", "Johnson Andy", "Kamara Diomansy", "Dembéle Moussa", "Hangeland Brede", "Murphy Danny", "Greening Jonathan", "Zamora Bobby", "Elm David", "Johnson Edward", "Salcido Carlos", "Davies Simon", "Duff Damien"],
				"Aston Villa": ["Agbonlahor Gabriel", "Beye Habib", "Carew John", "Collins James", "Cúellar Carlos", "Davies Curtis", "Downing Stewart", "Dunne Richard", "Friedel Brad", "Guzan Brad", "Heskey Emile", "Hogg Jonathan", "Lichaj Eric", "Ireland Stephen", "Osbourne Isaiah", "Petrov Stilian", "Reo-Coker Nigel", "Salifou Moustapha", "Sidwell Steven", "Warnock Stephen", "Young Ashley", "Young Luke"],
				"Sunderland": ["Angeleri Marcos", "Bardsley Phil", "Bent Darren", "Bramble Titus", "Campbell Fraizer", "Carson Trevor", "Cattermole Lee", "Da Silva Paulo", "Elmohamady Ahmed", "Ferdinand Anton", "Gordon Craig", "Healy David", "Malbranque Steed", "McCartney George", "Mensah John", "Mignolet Simon", "Onuoha Nedum", "Reid Andy", "Richardson Kieran", "Riveros Cristian", "Turner Michael", "Weir Robert", "Zenden Boudewijn", "Gyan Asamoah"],
				"Norwich": ["Campbell Sol", "Taylor Steven", "Ameobi Shola", "Barton Joey", "Guthrie Danny", "Lovenkrands Peter", "Enrique José", "Smith Alan", "Best Leon", "Coloccini Fabricio", "Gutiérrez Jonás", "Harper Steve", "Nolan Kevin", "Routledge Wayne", "Simpson Daniel", "Taylor Ryan", "Williamson Mike", "Xisco", "Forster Fraser", "Krul Tim", "Perch James", "Tioté Cheik", "Ben Arfa Hatem"],
				"Newcastle": ["Campbell Sol", "Taylor Steven", "Ameobi Shola", "Barton Joey", "Guthrie Danny", "Lovenkrands Peter", "Enrique José", "Smith Alan", "Best Leon", "Coloccini Fabricio", "Gutiérrez Jonás", "Harper Steve", "Nolan Kevin", "Routledge Wayne", "Simpson Daniel", "Taylor Ryan", "Williamson Mike", "Xisco", "Forster Fraser", "Krul Tim", "Perch James", "Tioté Cheik", "Ben Arfa Hatem"],
				"Wigan": ["Kirkland Chris", "Pollitt Mike", "N'Zogbia Charles", "Boyce Emmerson", "Caldwell Gary", "Watson Ben", "Caldwell Steven", "Thomas Hendry", "Stam Ronnie", "Gómez Jordi", "Rodallega Hugo", "Diamé Mohamed", "Figueroa Maynor", "Gohouri Steve", "De Ridder Daniel", "Al-Habsi Ali", "Alcaraz Antolín", "McArthur James", "Boselli Mauro"]
			};
		},
		
		channels: function()
		{
			return [
				"Branch",
				"Customer Service Centre",
				"Mail",
				"Personal Lender",
				"UIB"
			];
		},
		
		products: function()
		{
			return [
				"Consumer Finance",
				"Credit Cards",
				"Deposit & Transactions (incl TDs)",
				"Home Loans",
				"Personal Loans",
				"Other"
			];
		},
		
		objectives: function()
		{
			return [
				"Cross Sell",
				"Follow Up",
				"Information",
				"Information / Service",
				"Mandatory",
				"Retention",
				"Trigger",
				"Upsell",
				"Winback"
			];
		},
		
		campaigns: function()
		{
			return [
				"Self Serve Current",
				"POC Abandoned D&T",
				"POC Premier NTB",
				"Xsell ICRM Intr Dec 12",
				"POC Premier NTB DO v1",
				"Branch to premier  migr",
				"OD Everyday Needs",
				"Goal Saver TFN v2",
				"XSell Insuarance",
				"Univ",
				"1st Dep v2"
			];
		}
		
		
	};
	
	window.Fake = instance;
	
})();