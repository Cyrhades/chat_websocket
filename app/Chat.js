import { Server } from "socket.io";
import User from './User.js'
import Message from './Message.js'
import Channel from './Channel.js'

export default class Chat {

    constructor(httpServer) {
        this.users = [];
        this.channels = [new Channel('Général'), new Channel('Programmation'), new Channel('Jeux vidéo')];
        this.io = new Server(httpServer);

        this.onConnect();
    }

    onConnect() {
        this.io.on('connection', (socket) => {
            socket.on('client:user:connect', this.onUserConnect.bind(this,socket))
            // Equivalent
            // socket.on('client:user:connect', (pseudo) => this.onUserConnect(socket, pseudo))
            socket.on('client:user:disconnect', this.onUserDisconnect.bind(this, socket))

            socket.on('client:message:send', this.onMessageSend.bind(this, socket))

            socket.on('disconnect',  this.onUserDisconnect.bind(this, socket))

            socket.on('client:channel:change',  this.onChangeChannel.bind(this, socket))
        });  
    }

    onChangeChannel(socket, channel) {
        socket.join(channel);
        socket.user.joinChannel(channel);
    }

    onUserConnect(socket, pseudo) {
        let searchUser = this.users.filter((user) => user.pseudo == pseudo);
        if(searchUser.length > 0) {
            socket.emit("server:user:exists") 
         } else {
            let user = new User(pseudo);
            this.users.push(user)
            socket.user = user;
            this.onChangeChannel(socket, 'Général');
            socket.emit("server:user:connected", this.getChannelsList()) 
            this.io.emit('server:user:list', this.getUsersList())
         }
    }

    onUserDisconnect(socket) {
        this.users.splice(this.users.findIndex((user) => user.pseudo == socket.user.pseudo),1);
        socket.emit("server:user:disconnected") 
        this.io.emit('server:user:list', this.getUsersList())
    }

    onMessageSend(socket, msg) {
        const message = new Message(msg, socket.user.pseudo);
        this.io.emit('server:message:new', message)
    }


    getUsersList() {
        return this.users.map(user => user.pseudo);
    }

    getChannelsList() {
        return this.channels.map(channel => channel.name);
    }
}
