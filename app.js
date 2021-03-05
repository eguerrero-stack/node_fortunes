const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')

const app = express();
const fortunes = require('./data/fortunes.json')

app.use(bodyParser.json());

app.get('/fortunes',(req,res)=>{
    res.json(fortunes)
});

app.get('/fortunes/random',(req,res)=>{

    res.json(fortunes[Math.floor(Math.random() * fortunes.length)]);
})
app.get('/fortunes/:id',(req,res)=>{
   res.json(fortunes.find(f => f.id == req.params.id));

})

app.post('/fortunes',(req,res)=>{
    console.log(req.body)

    const {message, luckyNumber, spiritAnimal} = req.body
    const fortuneIds = fortunes.map(obj => obj.id);

    const fortune = {
        id: (fortuneIds.length > 0 ?Math.max(...fortuneIds) : 0) +1,
                message,
            luckyNumber,
          spiritAnimal};
    
    const newFortunes = fortunes.concat(fortune);
    fs.writeFile("./data/fortunes.json",JSON.stringify(newFortunes), err => console.log(err));
    res.json(newFortunes)
})

module.exports = app