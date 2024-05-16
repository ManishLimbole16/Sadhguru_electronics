const  port=3000
const mysql = require("mysql");
const express=require("express")
const cors=require("cors")
const app=express()
app.use(cors())
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'contact',
    authSwitchHandler: function ({ pluginName, data }, cb) {
      if (pluginName === 'auth_gssapi_client') {
        // If MySQL requests auth_gssapi_client, respond with a different authentication method.
        // You can choose an alternative method supported by your MySQL server.
        // Here, we'll use the 'mysql_native_password' method.
        return cb(null, Buffer.from([0x00])); // Respond with 'mysql_native_password'
      }
      cb(new Error(`Unsupported authentication method: ${pluginName}`));
    }
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
  
app.get('/submit',(req,res)=>{
    const name=req.query.name
    console.log(name)
    // const email=req.query.email
    // console.log(email)
    // const subject=req.query.subject
    // console.log(subject)
    // const message=req.query.message
    // console.log(message)
    const sql = `INSERT INTO info (name) VALUES ("${name}")`;
  connection.query(sql, [name], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).send("Error inserting data into MySQL");
      return;
    }
    console.log("Data inserted successfully into usertable");
    res.send("OK")
})
})
app.listen(port,()=>{
    console.log("Server started")
})