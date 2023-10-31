const johnSelectorBtn = document.querySelector('#john-selector')
const janeSelectorBtn = document.querySelector('#jane-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messagesBox = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message)=> `
    <div class="message ${message.sender === 'john' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
`

window.onload = ()=>{
    messagesBox.forEach(message =>{
        chatMessages.innerHTML += createChatMessageElement(message)
    })
}

let John = 'John'
let Jane = 'Jane'
let messageSender = 'john';
const updateMessageSender = (name)=>{
    messageSender = name;
    chatHeader.innerHTML = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}...`

    if(name === John){
        johnSelectorBtn.classList.add('active-person')
        janeSelectorBtn.classList.remove('active-person')
    }
    if(name === Jane){
        janeSelectorBtn.classList.add('active-person')
        johnSelectorBtn.classList.remove('active-person')
    }

    chatInput.focus()
}

johnSelectorBtn.onclick = () => updateMessageSender(John)
janeSelectorBtn.onclick = () => updateMessageSender(Jane)

const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }

    messagesBox.push(message)
    localStorage.setItem('messages', JSON.stringify(messagesBox))

    chatMessages.innerHTML += createChatMessageElement(message)
    chatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
}


chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', ()=>{
    if(chatMessages.innerHTML === 'John chatting' ||chatMessages.innerHTML === 'Jane chatting' ){
        alert('no message to clear')
    }else{
        localStorage.clear()
        chatMessages.innerHTML = 'this chat history has been cleared';
    }
})