const Block = require("./blockchain/block");
const faker = require("faker");
const mongoose = require("mongoose");

mongoose.connect("URI_CONNEXION_STRING",{ useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{
    //console.log("Successfully Connected to DATABASE")
}).catch(err=>{
    console.log("Unable to Connect to Database" + err)
});

const blockSchema = new mongoose.Schema({
    timestamp: String,
    lastHash: String,
    hash: String,
    data: String
});

const DBBlock = mongoose.model("blockchain",blockSchema,"blockchain");

console.log("\n----------------- BLOCKCHAIN -----------------\n");

let previousBlock = Block.mineBlock(Block.genesis(),"GENESIS BLOCK");

console.log("\n----------------- GENESIS -----------------\n");
console.log({
    data:previousBlock.data,
    hash:previousBlock.hash,
    lastHash: previousBlock.lastHash,
    timestamp: previousBlock.timestamp
})


/** CREATING FIRST BLOCK */
createBlock({
    data:previousBlock.data,
    hash:previousBlock.hash,
    lastHash: previousBlock.lastHash,
    timestamp: previousBlock.timestamp
});

/** RUNNING BLOCK INSERTION LOOP */
setInterval(
    function(){ 
        const dummyBlock = Block.mineBlock(previousBlock,faker.finance.transactionDescription());
        

        createBlock({
            data:dummyBlock.data,
            hash:dummyBlock.hash,
            lastHash: dummyBlock.lastHash,
            timestamp: dummyBlock.timestamp
        });

        console.log("\n----------------- Block -----------------\n");
        console.log({
            data:dummyBlock.data,
            hash:dummyBlock.hash,
            lastHash: dummyBlock.lastHash,
            timestamp: dummyBlock.timestamp
        })

        previousBlock = dummyBlock;
    }
,1500);

/** FUNCTION THAT INSERTS A BLOCK IN THE DB */
async function createBlock(block){
    await DBBlock.insertMany(block);
}