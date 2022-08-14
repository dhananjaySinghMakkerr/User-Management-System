const mysql=require('mysql');

const pool=mysql.createPool({
    connectionLimit :100,
    host            :process.env.DB_HOST,
    user            :process.env.DB_USER,
    password        :process.env.DB_PASS,
    database        :process.env.DB_NAME
 });

exports.view=(req,res)=>{
    pool.getConnection((err,connection)=>{
         if(err) throw err;
         console.log('Connected as id'+connection.threadId);
        
         //Use the connection
         connection.query('SELECT * FROM user WHERE status="active"',(err,rows)=>{
           //When done with the connection,release
           connection.release();
           if(!err)
           {
            res.render('home',{rows});
           }
           else
           {
            console.log(err);
           }
           console.log("The data from user table \n",rows);
         });
       
    });
}

exports.find=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as id'+connection.threadId);
         
        let searchVal=req.body.search;
        //Use the connection
        connection.query('SELECT * FROM user WHERE status="active" AND first_name LIKE ? OR last_name LIKE ? ',['%'+searchVal+'%','%'+searchVal+'%'],(err,rows)=>{
          //When done with the connection,release
          connection.release();
          if(!err)
          {
           res.render('home',{rows});
          }
          else
          {
           console.log(err);
          }
          console.log("The data from user table \n",rows);
        });
      
   });
}

exports.form=(req,res)=>{
    res.render('adduser');
}

exports.create=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as id'+connection.threadId);
        const {first_name,last_name,email,contact,comments}=req.body;
        //Use the connection
        connection.query('INSERT INTO user SET first_name=?,last_name=?,email=?,contact=?,comments=?',[first_name,last_name,email,contact,comments],(err,rows)=>{
          //When done with the connection,release
          connection.release();
          if(!err)
          {
           res.render('adduser',{alert:'User Added Successfully!'});
          }
          else
          {
           console.log(err);
          }
          console.log("The data from user table \n",rows);
        });
    });
}

exports.edit=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as id'+connection.threadId);
       
        //Use the connection
        connection.query('SELECT * FROM user WHERE id=?',[req.params.id],(err,rows)=>{
          //When done with the connection,release
          connection.release();
          if(!err)
          {
           res.render('edituser',{rows});
          }
          else
          {
           console.log(err);
          }
          console.log("The data from user table \n",rows);
        });
      
   });
}

exports.update=(req,res)=>{
    const {first_name,last_name,email,contact,comments}=req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as id'+connection.threadId);
        
        //Use the connection
        connection.query('UPDATE user SET first_name=?,last_name=?,email=?,contact=?,comments=? WHERE id=?',[first_name,last_name,email,contact,comments,req.params.id],(err,rows)=>{
          //When done with the connection,release
          connection.release();
          if(!err)
          {
            pool.getConnection((err,connection)=>{
                if(err) throw err;
                console.log('Connected as id'+connection.threadId);
               
                //Use the connection
                connection.query('SELECT * FROM user WHERE id=?',[req.params.id],(err,rows)=>{
                  //When done with the connection,release
                  connection.release();
                  if(!err)
                  {
                   res.render('edituser',{rows, alert :`${first_name} has been updated`});
                  }
                  else
                  {
                   console.log(err);
                  }
                  console.log("The data from user table \n",rows);
                });
              
           });
          }
          else
          {
           console.log(err);
          }
          //console.log("The data from user table \n",rows);
        });
      
   });
}

exports.delete=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as id'+connection.threadId);
        
        //Use the connection
        connection.query('UPDATE user SET status=? WHERE id=?',['removed',req.params.id],(err,rows)=>{
          //When done with the connection,release
          connection.release();
          if(!err)
          {
            res.redirect('/');
          }
          else
          {
           console.log(err);
          }
          //console.log("The data from user table \n",rows);
        });
      
   });
}

exports.userview=(req,res)=>
{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as id'+connection.threadId);
       
        //Use the connection
        connection.query('SELECT * FROM user WHERE id=?',[req.params.id],(err,rows)=>{
          //When done with the connection,release
          connection.release();
          if(!err)
          {
            const val=Object.values(rows);
            console.log(JSON.stringify(val[0].first_name));
            let s=JSON.stringify(val[0].first_name);
            res.render('viewuser',{rows,name:`${s}`});
          }
          else
          {
           console.log(err);
          }
          //console.log("The data from user table \n",rows);
        });
      
   });
}