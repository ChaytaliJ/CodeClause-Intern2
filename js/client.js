const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");

var audio = new Audio('images/iPhone ! Notification Sound ! Notification.mp3');

function append(message,position){
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }

}


const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

// Function to send a private message to a specific user
function sendPrivateMessage(receiver, message) {
  socket.emit('send', { message: message, sender: name, receiver: receiver });
}

socket.on('user-joined', name => {
  console.log(`${name} joined the chat`);
});

socket.on('receive', data => {
  const { message, name } = data;
  console.log(`${name}: ${message}`);
});

sendPrivateMessage('ReceiverName', 'Hello there!');



form.addEventListener('submit', e=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
});