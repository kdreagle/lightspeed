import mysql from 'promise-mysql'

export default mysql.createConnection({
  host     : 'lightspeed-demo2.mysql.database.azure.com',
  user     : 'kreagle@lightspeed-demo2',
  password : process.env.DB_PASS,
  database : 'lightspeed'
})
