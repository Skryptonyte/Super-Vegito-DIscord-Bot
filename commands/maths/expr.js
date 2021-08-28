const mathjs = require('mathjs');
module.exports = {
name: 'expr',
desc: 'Parse expression using math.js',
execute(message,args){
	if (args.length < 2){
		message.channel.send("Missing expression");
		return;
	}
	var expression = args.slice(1).join(" ");
	message.channel.send("`Answer: "+mathjs.parse(expression).compile().evaluate().toString()+"`");
}
}
