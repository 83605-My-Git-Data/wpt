const express = require('express');
const app = express();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const jwtSecret = 'hihellohowru';


app.use(express.json());



//  token of gaurav eyJhbGciOiJIUzI1NiJ9.YVdGdFoyRjFjbUYy.7E7bbucGvHp5N1JncWwpcRXaetQm9K_RZMbKV5U4ESw



const connectionString = {
    host:"localhost",
    port:"3306",
    database:"airbnb_db",
    user:"kd1_aditya_83605",
    password:"kd1"

}

app.post('/users/signup',(req,res)=>{
    const firstName = req.body.firstName;
    const lastName  = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;

    const changedPassword = btoa(password);
    console.log(changedPassword);
    

    let connection = mysql.createConnection(connectionString);
    connection.connect();


    let queryText = `insert into user (firstName,lastName,email,password,phoneNumber,createdTimestamp) values ('${firstName}','${lastName}',
    '${email}','${changedPassword}','${phoneNumber}',CURRENT_TIMESTAMP)`;

    connection.query(queryText,(err,result)=>{
        if(!err){
            res.write(JSON.stringify(result));
            connection.end();
            res.end();
        }
        else{
            res.write(JSON.stringify(err));
            connection.end();
            res.end();
        }
    })


})

app.post('/users/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const changedPassword = btoa(password);

    let connection = mysql.createConnection(connectionString)
    connection.connect();
    console.log(changedPassword);

    let queryText = `select id from user where email = '${email}' and password = '${changedPassword}'`;

    connection.query(queryText,(err,result)=>{
        if(!err){
            
            const id = result[0].id;
            console.log(id);
            const token = jwt.sign(changedPassword,jwtSecret);

            res.write(JSON.stringify(result));
            res.write(JSON.stringify(token));
            connection.end();
            res.end();
        }
        else{
            res.write(JSON.stringify(err));
            connection.end();
            res.end();
        }
    })


   
})



app.use((req,res,next)=>{
    const token = req.headers.authorization;

    if(token != undefined){
        let dataInsideToken = jwt.verify(token,jwtSecret);
        console.log(dataInsideToken);
        next();
    }
    else{
        res.write("msg:Token is invalid")
    }
})


app.get('/users/profile',(req,res)=>{
    
    let connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `select firstName,lastName,email,phoneNumber from user`

    connection.query(queryText,(err,result)=>{
        if(!err){
            res.json(result);
        }
        else{
            res.write(JSON.stringify(err));
            connection.end();
            res.end();

        }
    })


})


app.post('/property',(req,res)=>{
    const categoryId = req.body.categoryId;
    const title = req.body.title;
    const details = req.body.details;
    const address = req.body.address;
    const contactNo = req.body.contactNo;
    const ownerName = req.body.ownerName;
    const isLakeView = req.body.isLakeView;
    const isTV = req.body.isTV;
    const isAC = req.body.isAC;
    const isWifi = req.body.isWifi;
    const isMiniBar = req.body.isMiniBar;
    const isBreakfast = req.body.isBreakfast;
    const isParking = req.body.isParking;
    const guests = req.body.guests;
    const bedrooms = req.body.bedrooms;
    const beds = req.body.beds;
    const bathrooms  =req.body.bathrooms;
    const rent = req.body.rent;
    const profileImage = req.body.profileImage;

    
   

    let connection = mysql.createConnection(connectionString);

    connection.connect();

    let queryText = `insert into property (
        categoryId,
        title,
        details,
        address,
        contactNo,
        ownerName,
        isLakeView,
        isTV,
        isAC,
        isWifi,
        isMiniBar,
        isBreakfast,
        isParking,
        guests,
        bedrooms,
        beds,
        bathrooms,
        rent,
        profileImage,
        createdTimestamp
    ) values (
        '${categoryId}',
        '${title}',
        '${details}',
        '${address}',
        '${contactNo}',
        '${ownerName}',
        ${isLakeView},
        ${isTV},
        ${isAC},
        ${isWifi},
        ${isMiniBar},
        ${isBreakfast},
        ${isParking},
        ${guests},
        ${bedrooms},
        ${beds},
        ${bathrooms},
        ${rent},
        '${profileImage}',
        CURRENT_TIMESTAMP
        
    )`;


    connection.query(queryText,(err,result)=>{
        if(!err){
            res.write(JSON.stringify(result));
            connection.end();
            res.end();
        }
        else{
            res.write(JSON.stringify(err));
            connection.end();
            res.end();
        }
        
    })
})


app.get('/property',(req,res)=>{
    let connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `select * from property`;
    connection.query(queryText,(err,result)=>{
        if(!err){
            res.json(result);
            connection.end();
            res.end();
        }
        else{
            res.json(err);
            connection.end();
            res.end();
        }
    })
})

app.post('/category',(req,res)=>{
    const title = req.body.title;
    const details = req.body.details;
    const image = req.body.image;



    let connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `insert into category (title,details,image,createdTimestamp) values ('${title}','${details}','${image}',CURRENT_TIMESTAMP )`;

    connection.query(queryText,(err,result)=>{
        if(!err){
            res.json(result);
            connection.end();
        }
        else{
            res.json(err);
            connection.end();
        }
    })



})

// +------------------+-------------+------+-----+-------------------+-------------------+
// | Field            | Type        | Null | Key | Default           | Extra             |
// +------------------+-------------+------+-----+-------------------+-------------------+
// | id               | int         | NO   | PRI | NULL              | auto_increment    |
// | userId           | int         | YES  |     | NULL              |                   |
// | propertyId       | int         | YES  |     | NULL              |                   |
// | fromDate         | varchar(50) | YES  |     | NULL              |                   |
// | toDate           | varchar(50) | YES  |     | NULL              |                   |
// | total            | float       | YES  |     | NULL              |                   |
// | createdTimestamp | datetime    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
// +------------------+-------------+------+-----+-------------------+-------------------+

app.post('/booking',(req,res)=>{


   const token =  req.headers.authorization
   const dataInsideToken = token



})





app.listen(3000)