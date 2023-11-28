const socket = io.connect(document.location.host);

function tryConnect(exists) {
    if(exists) { 
        alert(`Ce pseudo est déjà utilisé par un autre utilisateur !`)
    }
    let pseudo = window.prompt(`Choisissez un pseuso :`);
    if(pseudo !== null && pseudo !== "") {
        socket.emit('client:user:connect', pseudo)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#connect_without_auth").addEventListener('click',() => tryConnect(false));
})

socket.on('server:user:exists', () => { tryConnect(true) })
socket.on('server:user:connected', () => {  
    /** afficher l'interface du chat et masquer le bouton de connexion */
 })






