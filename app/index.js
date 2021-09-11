const express = require('express');
//const cors = require('cors');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(express.json())

app.get('/blocks',(req,res)=>{
    return res.json(bc.chain);
});

app.post('/mine',(req,res)=>{
    let block = bc.addBlock(req.body.data);
    
    console.log(`New Block Added : ${block}`)

    p2pServer.syncChains();

    return res.redirect("/blocks");
});


app.listen(HTTP_PORT, ()=>{
    console.log(`Listening on port ${HTTP_PORT}`)
});

p2pServer.listen();