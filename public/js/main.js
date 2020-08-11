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

document.getElementById("imginput").addEventListener('change', readURL, true);

function readURL() {
    const files = document.getElementById("imginput").files;
    const file = files[files.length - 1];
    const reader = new FileReader();
    reader.onloadend = function () {
        document.getElementsByClassName('background')[0].style.backgroundImage = `url(${reader.result})`;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        console.error('file falsy');
    }
}

function onFileSelected(evt) {
    const fileInput = evt.target;
    const files = Array.from(evt.target.files).map(file => file.name);
    const placeholder = fileInput.getAttribute('data-placeholder') || fileInput.placeholder;

    // Store original placeholder
    fileInput.setAttribute('data-placeholder', placeholder);

    // Update current placeholder
    if (files.length === 1) {
        fileInput.placeholder = files[0].replace(/.*[\/\\]/, '');
    }
    else if (files.length > 1) {
        fileInput.placeholder = `${files.length} files`;
    }
    else {
        fileInput.placeholder = placeholder;
    }
}

document.querySelectorAll('input[type="file"]').forEach(el =>
    el.addEventListener('change', onFileSelected)
);