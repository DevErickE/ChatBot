// URLs dos arquivos JSON do ChatBot e Receber_Mensagens
const apiUrl = 'https://devericke.github.io/ChatBot/mensagens.json'; // JSON para mensagens enviadas pelo ChatBot
const externalApiUrl = 'https://devericke.github.io/Receber_Mensagens/mensagens.json'; // JSON para mensagens recebidas de Receber_Mensagens

// Função para adicionar uma mensagem ao chat
function addMessage(text, sender = "Você") {
    const messagesContainer = document.getElementById('messages');
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.textContent = `${sender}: ${text}`;
    messagesContainer.appendChild(newMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Função para enviar uma mensagem (lembre-se de que a atualização automática do JSON não é suportada no GitHub)
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value;

    if (messageText.trim() === '') {
        alert('Por favor, digite uma mensagem.');
        return;
    }

    addMessage(messageText); // Exibe no próprio chat
    messageInput.value = ''; // Limpa o campo

    console.log('Mensagem enviada (simulação):', messageText);
}

// Função para buscar mensagens do Receber_Mensagens
function fetchMessages() {
    fetch(externalApiUrl)
        .then(response => response.json())
        .then(messages => {
            document.getElementById('messages').innerHTML = '';
            messages.forEach(message => addMessage(message.content, "Receber_Mensagens"));
        })
        .catch(error => console.error('Erro ao buscar mensagens:', error));
}

// Atualiza mensagens do Receber_Mensagens a cada 5 segundos
setInterval(fetchMessages, 5000);
