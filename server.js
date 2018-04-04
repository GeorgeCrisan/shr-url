
const express = require('express')
const app = express()


app.use(express.static('public'))

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/new/:data(*)",(req,res)=>{
     let url = req.params.data;
  console.log(url + ' from get');
     res.json({"bun":url});
})

app.post("/new/:url(*)", (req, res) => {
   
       let url = req.params.url;
  
    console.log(url + ' from post');
  res.json({"bun":url});
});

// could

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
