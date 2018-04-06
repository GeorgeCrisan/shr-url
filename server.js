
const express = require('express');
const app = express();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const conectUrlDb = process.env.MONGOLAB_URI;

MongoClient.connect(conectUrlDb, (err,db)=>{
    if(err) 
        console.log(err);
    else {
       console.log('connection enstablished ' + conectUrlDb);
    
      
      
      
      db.close();
    }
  

});

app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
})

app.get("/new/:data(*)",(req,res)=>{
     let url = req.params.data;
  //console.log(url + ' from get address bar');
  
  
  
     res.json({"plecdinaddressbar":url});
});

app.post("/new/:url(*)", (req, res) => {
  
       let url = req.params.url;
    // console.log(url + ' from form send to client');
  
  
 
  res.send(JSON.stringify({ plecdinclient :url}));
});

// could

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
});
