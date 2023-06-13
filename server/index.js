const express = require('express');
const cors = require('cors')
const data = require("./data.json")
const mongoose = require("mongoose")
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const Todo = require("./models/to-do.js")

mongoose.connect("mongodb://localhost:27017/firstmongo")

app.use(cors());
app.use(bodyParser.json())

app.post('/api/post', async(req, res)=>{
    const response = await Todo.create(req.body);
    res.json({
        status: "ok", 
        body: {
            response
        }
    })
});

app.post('/api/delete', async(req, res)=>{
    const record = req.body
    console.log(record)
    const response = await Todo.deleteOne({
        _id: record._id
    });
    console.log(response);
    res.json({status: "ok"})
});

app.post('/api/complete', async(req, res)=>{
    console.log(req.body)
    await Todo.updateOne(
        {
            _id: req.body._id,
        }, 
        {
            $set: {
                complete: true
            }
        }
    )
    res.json({status: 'ok'})
})

app.get('/', (req, res)=>{
    res.send("Hello World!");
});

app.get('/api/get', async (req, res)=>{
    const records = await Todo.find({})
    res.json(records);
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});