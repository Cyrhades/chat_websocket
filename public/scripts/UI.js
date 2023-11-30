export default class UI {

    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.listenInterface();
        })        
    }

    listenInterface() {
        document.querySelector("#btnConnect").addEventListener('click',() => this.tryConnect(false));
        document.querySelector("#btnDisconnect").addEventListener('click', this.tryDisconnect)
        document.querySelector("#createMessage").addEventListener('keyup', this.sendMessage)
    }

    tryConnect(exists) {
        if(exists) { 
            alert(`Ce pseudo est déjà utilisé par un autre utilisateur !`)
        }
        let pseudo = window.prompt(`Choisissez un pseuso :`);
        if(pseudo !== null && pseudo !== "") {
            const event = new CustomEvent("local:user:connect", { detail: { pseudo } });
            document.dispatchEvent(event);
        }
    }

    tryDisconnect() {
        const event = new CustomEvent("local:user:disconnect");
        document.dispatchEvent(event);
    }

    sendMessage(event) {
        if(event.keyCode == 13) {
            let message = document.querySelector("#createMessage").value;
            if(message != "") {
                const event = new CustomEvent("local:message:send", { detail: { message } });
                document.dispatchEvent(event);
                document.querySelector("#createMessage").value = "";
            }
        }
    }

    connected(channels) {
        this.listChannels(channels);

        document.querySelectorAll('.not_authenticated').forEach((element) => {
            element.classList.add('hide')
        }) 
        document.querySelectorAll('.authenticated').forEach((element) => {
            element.classList.remove('hide')
        }) 
    }
    
    disconnected() {
        document.querySelectorAll('.not_authenticated').forEach((element) => {
            element.classList.remove('hide')
        }) 
        document.querySelectorAll('.authenticated').forEach((element) => {
            element.classList.add('hide')
        }) 
    }

    listUsers(users) {
        document.querySelector('#listingUsers').innerHTML = '';
        if ("content" in document.createElement("template")) {
            let template = document.querySelector("#usersTpl");
            users.forEach((user) => {
                let clone = document.importNode(template.content, true);
                clone.querySelector("li").textContent = user
                document.querySelector('#listingUsers').appendChild(clone);
            })
        }
    }

    listChannels(channels) {
        document.querySelector('#listingChannels').innerHTML = '';
        if ("content" in document.createElement("template")) {
            let template = document.querySelector("#channelsTpl");
            channels.forEach((channel) => {
                let clone = document.importNode(template.content, true);
                clone.querySelector("li").textContent = channel
                document.querySelector('#listingChannels').appendChild(clone);
            })
        }
    }


    addMessage(message) {
        if ("content" in document.createElement("template")) {
            let template = document.querySelector("#messagesTpl");
            let clone = document.importNode(template.content, true);
            clone.querySelector("td.time").textContent = message.date;
            clone.querySelector("td.author").textContent = message.author;
            clone.querySelector("td.message").textContent = message.content;
            document.querySelector('#listingMessages').appendChild(clone);
        }
    }
}