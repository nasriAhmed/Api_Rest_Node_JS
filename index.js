    const mysql = require('mysql');
    const express = require('express');
    const app = express();
    const bodyparser = require('body-parser');
    var jwt = require('jsonwebtoken');

    app.use(bodyparser.json());


        var mysqlConenction =mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'nasri@ahmed91',
            database:'api',
            multipleStatements: true
        });

        mysqlConenction.connect((err)=>{
        if(!err)
        console.log('DB Connection successful');
        else
        console.log('DB Connection failed \n Error : '+ JSON.stringify(err,undefined,2));

        });

    
    //Server runnig
    app.listen(3000,()=>console.log('Express Sever is runing at port N° 3000 '));


    //Afficher la liste de nombre

    app.get('/Numbers',(req,res)=>{
        //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        //res.setHeader("Content-Type", "text/json");
        //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        //res.setHeader("Access-Control-Allow-Origin", "*");

        mysqlConenction.query('select * from labeltest',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
    });

    
    //Afficher un nombre selon L'ID

    app.get('/Numbers/:id',(req,res)=>{
            mysqlConenction.query('select * from labeltest where IpId = ?',[req.params.id],(err,rows,fields)=>{
            if(!err)
            res.send(rows);
            else
            console.log(err);
    })
    });

    //Supprimer une valeur

    app.delete('/Numbers/delete/:id',(req,res)=>{
        mysqlConenction.query('delete from labeltest where IpId = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('Deleted successfully');
        else
        console.log(err);
    })
    });


    //Ajouter une valeur

    app.post('/Numbers', (req, res) => {
        let emp = req.body;
        var sql = "SET @IpId = ?;SET @numero = ?";
        mysqlConnection.query(sql, [emp.IpId, emp.numero], (err, rows, fields) => {
            if (!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Inserted LabelTest id : '+element[0].IpId);
                });
            else
                console.log(err);
        })
    });

    //Moayenne de la liste

    app.get('/Numbers/insert/:id',(req,res)=>{
        mysqlConenction.query('delete from labeltest where IpId = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('Deleted successfully');
        else
        console.log(err);
    })
    });

    //Medianne de la liste

    app.get('/Numbers/insert/:id',(req,res)=>{
        mysqlConenction.query('delete from labeltest where IpId = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('Deleted successfully');
        else
        console.log(err);
    })
    });

    
    
    //Opérations mathématiques sur la liste
    //Soustraction Liste Number
    
        app.get('/Numbers/sous/:flightNo',(req,res)=>{
            var id = req.params.flightNo;
        
            mysqlConenction.query('select IpId,numero, (numero + '+id+') as soustraction  from labeltest group by IpId',(err,rows,fields)=>{
            if(!err)
            res.send(rows);
            else
            console.log(err);
        })

        });

        //Multiple Liste Number
    
        app.get('/Numbers/multi/:flightNo',(req,res)=>{
            var id = req.params.flightNo;
        
            mysqlConenction.query('select IpId,numero, (numero * '+id+') as soustraction  from labeltest group by IpId',(err,rows,fields)=>{
            if(!err)
            res.send(rows);
            else
            console.log(err);
        })

        });
