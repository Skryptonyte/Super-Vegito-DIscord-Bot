
module.exports = {init(){
    console.log("Initialzing economy");
    try{
    economy_db.exec('CREATE TABLE IF NOT EXISTS economy (user_id int primary key, money decimal(11,2))')
    }
    catch (err){
    console.error(err);
}
}
}
