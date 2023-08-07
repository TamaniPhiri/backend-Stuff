const express=require('express');
const bodyParser=require('body-parser')

const app=express();
const port=8080;

app.use(bodyParser.json());
app.use(express.json());
app.use('/',require('./routes/router'));

app.get('/',(req,res)=>{
    res.send("API")
})

app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
})