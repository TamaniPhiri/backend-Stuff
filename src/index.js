const express=require('express')
const bodyParser = require('body-parser');
const { router } = require('./routes/router');

const port=8080;
const app=express();

app.use(express.json())
app.use(bodyParser.json());

app.use('/api',require('./routes/router'))

app.get('/',(req,res)=>{
    res.json({message:"APi"}).status(200)
})


app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
})
