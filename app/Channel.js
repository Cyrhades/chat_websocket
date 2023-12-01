export default class Channel {
    constructor(name) {
        this.name = name;
        this.messages = [];
    }

    addMessage(message) {
        this.messages.push(message);
    }
}