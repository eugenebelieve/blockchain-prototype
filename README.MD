# TINY BLOCKCHAIN PROJECT

## To Build a chain of hashed blocks in your Database


### First Change the URI 

Replace URI_CONNEXION_STRING by your Database URI:

```
mongoose.connect("URI_CONNEXION_STRING",{ useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{
    console.log("Successfully Connected to DATABASE")
}).catch(err=>{
    console.log("DB Connection Error" + err)
});
```

### Run the command 

Run the command from root folder to start building you chain of hashed blocks in your database:
```
npm run build-blockchain
```