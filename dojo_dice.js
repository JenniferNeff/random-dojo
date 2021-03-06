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
//
var filtered_skills = skills;
var memory = [];

// Making a function that works like Python's isin functionality.
// Does the list contain this item?
// If yesOrNo is true, return true if the list contains the item.
// If yesOrNo is false, return true if the list does NOT contain the item.

function isIn(item, list, yesOrNo) {
	return (list.some(function(i) {return i === item;})) == yesOrNo;
}

// This filters the list. Do this before every user action to select a skill.
// Returns the filtered list.

function build_filter(list) {

	var skill_levels = [];
	if (document.getElementById('difficulty_basic').checked) {skill_levels.push('basic');}
	if (document.getElementById('difficulty_inter').checked) {skill_levels.push('inter');}
	if (document.getElementById('difficulty_advanced').checked) {skill_levels.push('advanced');}

	var styles = ['krav'];
	var types = ['all'];
	// account for hazards here too, if disallowed entirely
	
	var allow_repeats = !document.getElementById("cool_toggle").checked;
	var cooldown = parseInt(document.getElementById("cooldown").value);
	//console.log(cooldown);
	//console.log("Filtering with memory: " + memory);
	
	var filtered_skills = skills.filter(
		function(i) {return isIn(i.level, skill_levels, true) &&
		                    isIn(i.style, styles, true) &&
		                    isIn(i.type, types, true) &&
				    (allow_repeats || isIn(i.name, memory.slice(0-cooldown), false));});
	// AND hazard status
	
	return filtered_skills;
}

// This function will actually choose the skill every time the button on the
// page is pressed. Options can change between button-presses so the filters
// must be rebuilt every time.

var roll = function (event) {
	
	var filtered_skills = build_filter(skills);
	
	var answer = "Empty set of skills.\nTry turning on more options.";
	
	if (filtered_skills.length > 0) {answer = filtered_skills[Math.floor(Math.random()*filtered_skills.length)].name;
		memory.push(answer);
	}

	document.getElementById("report").innerHTML = answer;
};

// A variation, allowing a few skills to be displayed in the manner of a spinning wheel
// before settling on one. This option should be presented alongside the option to
// choose instantly rather than replacing it.

var spin = async function (event) {

	document.getElementById("lever").setAttribute("disabled", "disabled");
	document.getElementById("wheel").setAttribute("disabled", "disabled");

	var filtered_skills = build_filter(skills);

	if (filtered_skills.length == 0) {
		document.getElementById("report").innerHTML = "Empty set of skills.\nTry turning on more options.";
		return;
	}

        // https://flaviocopes.com/how-to-shuffle-array-javascript
	filtered_skills.sort(() => Math.random() - 0.5);
	//filtered_skills.forEach(e => console.log(e.name));

	var spin_length = Math.min(8, filtered_skills.length);
	//console.log("Spin length: " + spin_length);
	var delay = [300];
	for (var d=0; d < spin_length-2; d++) {
		delay.push(Math.max(delay[d] - 25, 100));
	}
	delay[0] = 550;
	delay.reverse();
	//console.log(delay);

	for (var i=0; i < spin_length-1; i++) { // save the last for after the last promise-pause
		document.getElementById("report").innerHTML = "<div style=\"opacity: 50%;\"><em>" + filtered_skills[i].name + "</em></div>";
		// https://appdividend.com/2020/07/31/javascript-wait-how-to-make-function-wait-in-javascript/
		await new Promise(r => setTimeout(r, delay[i]));
	}
	answer = filtered_skills[spin_length-1].name;
	memory.push(answer);
	document.getElementById("report").innerHTML = answer;

	document.getElementById("lever").removeAttribute("disabled");
	document.getElementById("wheel").removeAttribute("disabled");

}
