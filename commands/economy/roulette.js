

function roulette_single(number_array,compNumber){
	if (number_array[0] === compNumber){
		return 1;
	}
	else{
	return 0;
	}
}

function roulette_manque(number_array,compNumber){
	if (compNumber <= 18 && compNumber >= 1){
		return 1;
	}
	else{
	return 0;
	}
}

function roulette_passe(number_array,compNumber){
	if (compNumber >= 18 && compNumber <= 36){
		return 1;
	}
	else{
		return 0;
	}
}

const betTable = {single:[roulette_single,4,35], 
		manque:[roulette_manque,3,1], 
		passe:[roulette_passe,3,1]}

module.exports = {
name: 'roulette',
desc: 'Play roulette',
execute(message,args){
	const user_id = message.member.id;
	if (args.length < 3){
		message.channel.send("`Usage: !roulette <wager> <bet-type> <arguments>`");
		return;
	}
	const wager = parseInt(args[1]);
	if (wager <= 0.0 || isNaN(wager)){
		message.channel.send("Wager has invalid value");
		return;
	}
	money_check = economy_db.prepare('select * from economy where user_id = ?').get([user_id])['money'];
	if (wager > money_check){
		message.channel.send("Too little money");
		return;
	}

	const computer_random = require('random').int(min=1,max=36);
	
	// Run through all bet types
	const bet_type = args[2];		
	// Format : label: [function_name,argument count, multipler]	
	
	if (!(bet_type in betTable)){
		message.channel.send("Bet type does not exist");
		return;
	}
	
	var number_array = []
	for (var i = 3; i < betTable[bet_type][1]; i++){
		if (isNaN(parseInt(args[i]))){
			message.channel.send("Invalid data");
			return;
		}
		number_array.push(parseInt(args[i]));
	} 

	message.channel.send("Computer responds: "+computer_random);	
	var win = betTable[bet_type][0](number_array,computer_random)
	if (win === 1){
		message.channel.send("Bet won");
		economy_db.prepare("update economy set money = money + ? where user_id = ?").run([wager * betTable[bet_type][2],user_id]);
	}
	else{
		message.channel.send("Bet lost");
		economy_db.prepare("update economy set money = money - ? where user_id = ?").run([wager,user_id]);
	}
}}
