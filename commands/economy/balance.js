module.exports = {
name: 'balance',
desc: 'Get amount of money',
execute(message,args){
	const user_id = message.member.id;
	var row = economy_db.prepare('select * from economy where user_id=?').get([user_id])
	if (row === undefined){
		economy_db.prepare('insert into economy values(?,100.00)').run([user_id]); 
		row = economy_db.prepare('select * from economy where user_id=?').get([user_id])
	}
	balance = row['money']
	message.channel.send('Your balance: '+ balance);
}
}
