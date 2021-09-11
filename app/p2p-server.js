const WebSocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

const peers = process.env.PEERS ? process.env.PEERS.split(','):[];

class P2pServer{
    
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen(){
        const server = new WebSocket.Server({ port:P2P_PORT });
        server.on('connection', socket  =>  this.connectSocket(socket));
        this.connectToPeers();
        console.log(`Listening for peer-to-peer connection on : ${P2P_PORT}`);
    }

    /** CONNECT TO PEERS */ 
    connectToPeers(){
        peers.forEach(peer => {
            // ws://localhost:5001
            const socket = new WebSocket(peer);

            // IF WE LAUNCH IT THE FIRST TIME IT OPEN THE 5001 SOCKET
            socket.on('open', ()=>this.connectSocket(socket));
        });
    }

    connectSocket(socket){
        this.sockets.push(socket);
        console.log('Socket connected');

        this.messageHandler(socket);
        
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    messageHandler(socket){
        socket.on('message', message=>{
            const data = JSON.parse(message);
            console.log('data',data);
            this.blockchain.replaceChain(data);
        });
    }

    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChains(){
        this.sockets.forEach(socket=>{
            this.sendChain(socket)
        });
    }

}

module.exports = P2pServer;