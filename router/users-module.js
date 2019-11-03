var express = require("express");
var usersrouter = express.Router();
var bodyParser = require("body-parser");
var mysql = require("mysql");
// เพิ่มความปลอดภัย รหัสผ่าน
var md5 =require("md5");

usersrouter.use(
  bodyParser.json({
    extended: true
  })
);
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "angular_hotel"
});

// const request = new sql.Request()
usersrouter.route("/").get(function(req, res) {
  res.json("hello");
});

function connect() {
  connection.connect(function(err) {
    if (err) {
      console.error("Error connecting: " + err.stack);
      return;
    }

    console.log("Connected as id " + connection.threadId);
  });

}

// ดึงข้อมูล user
// req รับค่า
// res ส่งค่า
usersrouter.route("/getUser_User").post(function(req, res) {
  connect()
  var query = `SELECT * FROM user WHERE 1`;
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    results.forEach(result => {
      console.log(result);
    });
    res.status(200).json(results);
  });

});


usersrouter.route("/getInsert_User").post(function(req, res) {
  // ตั้งขึ้นมาเอง
  console.log(req.body)
  
  
  // var user_id_user = req.body.user_id_user;
  var user_name_user = req.body.user_name_user; //ได้
  var user_lastname_user = req.body.user_lastname_user; // ได้
   var age_user = req.body.age_user;
  var user_call_user = req.body.user_call_user;
  var address_user = req.body.address_user;
  var email_address_user = req.body.email_address_user;
  connect()
  // ค่าที่ส่งมาจาก ฐานข้อมูล
  var query = `INSERT INTO user(
    user_id,
    user_name,
    user_lastname,
    age,
    user_call,
    address,
    email_address
 
)
VALUES(
    
 
    NULL,
    '${user_name_user}',
    '${user_lastname_user}',
    '${age_user}',
    '${user_call_user}',
    '${address_user}',
    '${email_address_user}'
    
  
)`;
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });

});

usersrouter.route("/getUpdate_User").post(function(req, res) {
  var user_id_user = req.body.user_id_user;
  var user_name_user = req.body.user_name_user; //ได้
  var user_lastname_user = req.body.user_lastname_user; // ได้
   var age_user = req.body.age_user;
  var user_call_user = req.body.user_call_user;
  var address_user = req.body.address_user;
  var email_address_user = req.body.email_address_user;
  connect()
  var query = `UPDATE
  user
SET
  
  user_name = "${user_name_user}",
  user_lastname = "${user_lastname_user}",
  age ="${age_user}",
  user_call = "${user_call_user}",
  address = "${address_user}",
  email_address = "${email_address_user}"
WHERE
  user_id = "${user_id_user}"`;
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    
    res.status(200).json(results);
  });

});

// ดึงข้อมูล user
usersrouter.route("/getAllUsers").post(function(req, res) {
  var user_name = req.body.user_name;
  connect()
  var query = `SELECT * FROM member WHERE 1`;
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    results.forEach(result => {
      console.log(result);
    });
    res.status(200).json(results);
  });

});

usersrouter.route("/getDelete_user").post(function(req, res) {
  var user_id_user = req.body.user_id_user;
  connect()
  var query = `DELETE FROM user WHERE user_id ='${user_id_user}'`;
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    // console.log(query)
    res.status(200).json(results);
  });

});
usersrouter.route("/getUser_Firt").post(function(req, res) {
  var user_id_user = req.body.user_id_user;
  connect()
  var query = `SELECT * FROM user WHERE user_id = '30'`;
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    results.forEach(result => {
      console.log(result);
    });
    res.status(200).json(results);
  });

});



module.exports = usersrouter;
