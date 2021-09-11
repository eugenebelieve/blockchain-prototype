const Block = require("./blockchain/block");
const faker = require("faker");
const mongoose = require("mongoose");

mongoose.connect("MONGODB_CONNEXION_STRING",{ useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{
    console.log("Successfully Connected to DATABASE")
}).catch(err=>{
    console.log("DB Connection Error" + err)
});

console.log("\n----------------- BLOCKCHAIN -----------------\n");

const fooBlock = Block.mineBlock(Block.genesis(),"GENESIS BLOCK");
console.log(fooBlock.toString());

setInterval(
    function(){ 
        const dummyBlock = Block.mineBlock(fooBlock,faker.finance.transactionDescription());
        console.log(dummyBlock.toString());
    }
,1500);
