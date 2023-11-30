import UI from "./UI.js"
export default class Chat {

    constructor() {
        this.socket = io.connect(document.location.host);
        this.ui = new UI();
        this.listenWebSocketServer();
        this.listenLocalEvent();
    }

    listenWebSocketServer() {
        this.socket.on('server:user:exists', () => { this.ui.tryConnect(true) })
        this.socket.on('server:user:connected', this.ui.connected)
        this.socket.on('server:user:disconnected', this.ui.disconnected)
        this.socket.on('server:user:list', this.ui.listUsers)
        this.socket.on('server:message:new', this.ui.addMessage)
    }

    listenLocalEvent() {
        document.addEventListener('local:user:connect', (e) => {
            this.socket.emit('client:user:connect', e.detail.pseudo)
        })

        document.addEventListener('local:user:disconnect', (e) => {
            this.socket.emit('client:user:disconnect')
        })

        document.addEventListener('local:message:send', (e) => {
            this.socket.emit('client:message:send', e.detail.message)
        })
        
    }
}