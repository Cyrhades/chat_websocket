export default class UI {

    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.listenInterface();
        })        
    }

    listenInterface() {
        document.querySelector("#btnConnect").addEventListener('click',() => this.tryConnect(false));
        document.querySelector("#btnDisconnect").addEventListener('click', () => { this.tryDisconnect(); })
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


    connected() {
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
}