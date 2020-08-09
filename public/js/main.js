const socket = io('/');
const blur = document.getElementsByClassName("blur")[0];
socket.emit('join-room');

const widthSlider = document.getElementById('blurWidth');
const intensitySlider = document.getElementById('blurIntensity');
widthSlider.oninput = function () {
    blur.style.height = `${this.value}%`;
}
intensitySlider.oninput = function () {
    blur.style.backdropFilter = `blur(${this.value}px)`;
}

socket.on('user-connected', (newUserId) => {
    addMessage(newUserId);
    connectToNewUser(newUserId);
});

socket.on('user-disconnected', (oldUserId) => {
    addMessage(oldUserId);
});

socket.on('connected-self', (myid) => {
    addMessage(myid);
    console.log('connected-self', myid);
});

const connectToNewUser = (newUserId) => {
    console.log('new user', newUserId);
}

const addMessage = (msg) => {
    const chat = document.getElementById('chat');
    const message = document.createElement('span');
    message.className = "message";
    message.innerHTML = typeof (msg) === "object" ? JSON.stringify(msg) : msg;
    chat.appendChild(message);
};