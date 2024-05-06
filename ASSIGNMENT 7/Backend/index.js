const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.json());



const connectionString = {
    host:"localhost",
    port:"3306",
    database:"airbnb_db",
    user:"kd1_aditya_83605",
    password:"kd1"

}



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



app.listen(3000)