import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import { createConnection } from 'mysql2';

const app = express();

app.use(cors());
app.use(bodyparser());


//Connecting to mysql

const db= createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'Dzylo',
    port:3306 
});


//Checking DB connection

db.connect(err=>{
    if (err) {console.log(err, 'dberr');}
    console.log('Database Connected...')
})


//get data

app.get('/expense', (req,res)=>{
        
    let qr = `select * from expense`;

    db.query(qr,(err,result)=>{

            if(err)
            {
                console.log(err, 'errs');
            }

            if(result.length>0)
            {
                res.send({
                        message:`All expense data`,
                        data:result
                });
            }
    })
})


//add data

app.post(`/expense`,(req,res)=>{

    console.log(req.body,'createdata');

    let name = req.body.item_name;
    let date = req.body.date;
    let amount = req.body.amount;

    let qr = `insert into expense(item_name, date, amount) values('${name}','${date}','${amount}')`;

    db.query(qr,(err, result)=>{

            if(err){console.log(err);}
            console.log(result,'result')
            res.send({
                message:'Data inserted',
            });


    });
});


// delete data

app.delete('/expense/:id',(req,res)=>{

    let qid = req.params.id;
    let qr = `delete from expense where id = '${qid}'`;
    db.query(qr,(err,result)=>{
        if(err) {console.log(err);}

        res.send(
            {
                message:'Data deleted'
            }
        )
    })

})






app.listen(3000, ()=> {
    console.log('server running...');
})