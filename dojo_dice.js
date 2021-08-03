// A script to choose random martial arts skills.
// Jennifer Neff
// 2021/07/30
//
// Commented for coding white belts!


// Every skill has these properties:
// name - What it's called.
// level - Always "basic", "inter", or "advanced". All lowercase; it matters!
// style - Just put "krav" for now. Maybe more later.
// type - A category as defined on the page. Just use "all" for now.
// hazard - Use this to flag a skill that you wish to easily exclude
//          from being selected, or mark as dangerous.
//          (e.g. anything aimed at the head that should only be done slowly)
//          Set this to true or false. Note the lack of quotation marks;
//          these are booleans, not strings.

function Skill(name, level, style, type, hazard) {
	this.name = name;
	this.level = level;
	this.style = style;
	this.type = type;
	this.hazard = hazard;
}

var skills = [];

// Add more lines like the one below with all the skills you need.
// If I were being more clever I would import this from an external list.
// Use double-quotes so that you can use apostrophes inside the names.

skills.push(new Skill("Front jab", 'basic', 'krav', 'all', false));
skills.push(new Skill("Combo 4", 'basic', 'krav', 'all', false));
skills.push(new Skill("Round kick", 'basic', 'krav', 'all', false));

// This comment organizes the list!
skills.push(new Skill("Step side kick", 'inter', 'krav', 'all', false));
skills.push(new Skill("Duck! R-L-R", 'inter', 'krav', 'all', false));

// Clearly these advanced skills are just placeholders...
skills.push(new Skill("Mr. Fong's favorite spin kick", 'advanced', 'krav', 'all', true));
skills.push(new Skill("Very tricky example disarm", 'advanced', 'krav', 'all', false));


// Don't add things past this comment!

// Making a function that works like Python's isin functionality.
// Does the list contain this item? Returns true or false.

function isIn(item, list) {
	return list.some(function(i) {return i === item;})
}

// This function will actually choose the skill every time the button on the
// page is pressed. Options can change between button-presses so the filters
// must be rebuilt every time.

var roll = function (event) {

	var skill_levels = [];
	if (document.getElementById('difficulty_basic').checked) {skill_levels.push('basic');}
	if (document.getElementById('difficulty_inter').checked) {skill_levels.push('inter');}
	if (document.getElementById('difficulty_advanced').checked) {skill_levels.push('advanced');}

	var styles = ['krav'];
	var types = ['all'];
	// account for hazards here too, if disallowed entirely
	
	var filtered_skills = skills.filter(
		function(i) {return isIn(i.level, skill_levels) &&
		                    isIn(i.style, styles) &&
		                    isIn(i.type, types);});
	// AND hazard status
	
	var answer = "Empty set of skills.\nTry turning on more options.";
	
	if (filtered_skills.length > 0) {answer = filtered_skills[Math.floor(Math.random()*filtered_skills.length)].name;}

	document.getElementById("report").innerHTML = answer;
};
