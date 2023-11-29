import { Server } from "socket.io";
import User from './User.js'

export default class Chat {

    constructor(httpServer) {
        this.users = [];
        this.io = new Server(httpServer);

        this.onConnect();
    }

    onConnect() {
        this.io.on('connection', (socket) => {
            socket.on('client:user:connect', this.onUserConnect.bind(this,socket))
            // Equivalent
            // socket.on('client:user:connect', (pseudo) => this.onUserConnect(socket, pseudo))
            socket.on('client:user:disconnect', this.onUserDisconnect.bind(this, socket))
        });  
    }

    onUserConnect(socket, pseudo) {
        let searchUser = this.users.filter((user) => user.pseudo == pseudo);
        if(searchUser.length > 0) {
            socket.emit("server:user:exists") 
         } else {
            let user = new User(pseudo);
            this.users.push(user)
            socket.user = user;
            socket.emit("server:user:connected") 
            this.io.emit('server:user:list', this.getUsersList())
         }
    }


    onUserDisconnect(socket) {

        this.users.splice(this.users.findIndex((user) => user.pseudo == socket.user.pseudo),1);
        socket.emit("server:user:disconnected") 
        this.io.emit('server:user:list', this.getUsersList())
    }


    getUsersList() {
        return this.users.map(user => user.pseudo);
    }
}
