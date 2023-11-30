export default class Message {
    constructor(message, author) {
        this.content = message;
        this.author = author;
        this.date = new Date().toLocaleTimeString('fr-FR')
    }
}