const fs = require('fs')
const color = require('colors')
const sqlite = require('better-sqlite3')
Discord = require('discord.js');
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGES]});
//Databases

economy_db = new sqlite('./db/economy.db',sqlite.OPEN_READWRITE);

client.commands = new Discord.Collection();

const commandList = fs.readdirSync('./commands')

console.log("Reading commands.")
// Populate commands
for (i of commandList){
	var dirString = "./commands/" +i;
	if (fs.lstatSync(dirString).isDirectory()){
		if (fs.existsSync(dirString+'/__init__.js')){
			var initializeModule = require(dirString+'/__init__.js');
			initializeModule.init();
		}
		var cmdFiles = fs.readdirSync(dirString).filter(filename => {return filename.endsWith('.js') && !(filename === '__init__.js')});
		for (const i of cmdFiles){
			console.log('-- '+'Populating ' + i.green);
			var cmdfile = require(dirString+'/'+i);
			client.commands.set(cmdfile.name,cmdfile);		
		}
	}
}


const prefix = '!';
client.once('ready', () => {
    console.log('START!');
})



// Discord Bot Loop
client.on('message',message => {
try{
console.log("[CHAT]".blue +`[${message.member.user.tag}]: `.green +message.content);
const user_id = message.member.id;
        var row = economy_db.prepare('select * from economy where user_id=?').get([user_id])
        if (row === undefined){
              economy_db.prepare('insert into economy values(?,100.00)').run([user_id]);
        }
if (message.content.startsWith(prefix)){
	var args = message.content.slice(prefix.length).split(/ +/);

	if (client.commands.has(args[0])){
	client.commands.get(args[0]).execute(message,args);}
	else{
	message.channel.send("Command doesn't exist (yet)");
	}
}
else{
const stmt = economy_db.prepare('update economy set money = money + 1 where user_id = ?').run([message.member.id]);
}
}
catch (err){
	console.log("[ERR]: ".red + err);
}
})

token = process.argv[2]

if (token != undefined){
	client.login(token);
}
else
{
	console.log("\nMissing Token! Syntax: node bot.js <token>".red)
}
