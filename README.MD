# TINY BLOCKCHAIN PROJECT

## Builds a chain of hashed blocks of financial statements in your Database

### Change the Connection URI to your Database

Replace URI_CONNECTION_STRING by your Database URI:

```
mongoose.connect("URI_CONNECTION_STRING",{ useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{
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