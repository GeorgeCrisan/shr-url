// request modules and init app and MongoClient

const express = require('express');
const isUrl = require('is-url');
const app = express();
const shortid = require('shortid');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const conectUrlDb = process.env.MONGOLAB_URI;
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#@');


// create collection 
MongoClient.connect(conectUrlDb, (err,db)=>{
    if(err) 
        console.log(err);
    else {
       console.log('connection enstablished ' + conectUrlDb);
       let dbo = db.db('url-short-rdp');
       
      dbo.createCollection('store-for-url',(err,res)=>{
           
          //console.log('collection created');
          db.close();       
       
       });
    }
  

});

// render index as static and declare public 
app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
})


// route data from addressbar request
app.get("/new/:data(*)",(req,res)=>{
     
        let url = req.params.data;
       if(!isUrl(url)){
          
          res.json({url: 'not valid url'});
         
       } else {
    
     
     
     let uniqueId = shortid.generate();
  //console.log(url + ' from get address bar');
    
  let dataToStore = {uniqueId: uniqueId, url: url };
  let dataToReturn = {original_url: url, short_url: 'https://shr-url.glitch.me/' + uniqueId };
  
    MongoClient.connect(conectUrlDb,(err,db)=>{
      
             if (err) console.log(err + 'from get route addressbar');
      
      let dbo = db.db('url-short-rdp');
      
      dbo.collection('store-for-url').insertOne(dataToStore,(err,res)=>{
        
           if(err) throw err;
        
        console.log('1 doc gone');
        
        db.close();
        
      });
     
    });
  
  
  
     res.json(dataToReturn);
       }
});

//route data from the form request

app.post("/new/:url(*)", (req, res) => {
  
       let url = req.params.url;
  if(!isUrl(url)){
          
          res.send(JSON.stringify({url: 'not valid url'}));
         
       } else {
         
         
         let uniqueId = shortid.generate();
  //console.log(url + ' from get address bar');
    
  let dataToStore = {uniqueId: uniqueId, url: url };
  let dataToReturn = {original_url: url, short_url: 'https://shr-url.glitch.me/' + uniqueId };
  
    MongoClient.connect(conectUrlDb,(err,db)=>{
      
             if (err) console.log(err + 'from get route addressbar');
      
      let dbo = db.db('url-short-rdp');
      
      dbo.collection('store-for-url').insertOne(dataToStore,(err,res)=>{
        
           if(err) throw err;
        
        console.log('1 doc gone');
        
        db.close();
        
      });
     
    });
  
  
  
     res.send(JSON.stringify(dataToReturn));
       
       }
    // console.log(url + ' from form send to client');
  
  
 
  
});

// could


app.get('/:id',(req,res)=>{
            let id = req.params.id;
           
        MongoClient.connect(conectUrlDb,(err,db)=>{
              if(err) throw err;
          
          let dbo = db.db('url-short-rdp');
          let query = {uniqueId: id};
          dbo.collection('store-for-url').findOne(query,(err,result)=>{
                 if(err) throw err;
            
 
            console.log(result);
            res.redirect(result.url);
          
          });
        
        });
        

        });


//listen to server and run

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
});
