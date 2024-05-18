 var mysql=require('mysql');
 var connection=mysql.createPool({
 	connectionLimit : 1000,
  	connectTimeout  : 60 * 60 * 1000,
  	acquireTimeout  : 60 * 60 * 1000,
  	timeout         : 60 * 60 * 1000,
	host:'localhost',
 	user:'settlemint',
 // password:'erg0s0ft@#!',
 	password:'settlemint@#!',
 	database:'jharkhand_seed',
 	//charset : 'utf8mb4'
 
});
 module.exports=connection;
