export default class User {

    constructor(pseudo) {
        this.pseudo = pseudo;
        this.channel;
    }

    joinChannel(channel) {
        this.channel = channel;
    }
}