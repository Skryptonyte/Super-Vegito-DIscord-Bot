module.exports={
"name":"dice",
"desc":"Rolls a dice",
execute(message,args){
	message.channel.send("Your number: "+random.int(min=1,max=6));
}
}
