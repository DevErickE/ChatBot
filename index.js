let messageCount = 0; // Contador de mensagens
const messagesArray = []; // Array para armazenar mensagens
const thankYouMessages = [
    "Obrigado por participar!",
    "Sua mensagem é muito importante!",
    "Agradecemos sua contribuição!",
];

document.getElementById('sendButton').addEventListener('click', function() {
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value;
    const feedback = document.getElementById('feedback');
    const name = nameInput.value.trim();

    if (messageText.trim() === '') {
        alert('Por favor, digite uma mensagem.');
        return;
    }

    // Adiciona a mensagem ao chat
    const messagesContainer = document.getElementById('messages');
    const newMessage = document.createElement('div');
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formato de hora

    // Cria um elemento de mensagem com link se houver
    const formattedMessage = formatMessage(name, messageText, timeString);
    newMessage.innerHTML = formattedMessage;
    messagesContainer.appendChild(newMessage);

    // Animação suave ao adicionar a nova mensagem
    newMessage.style.opacity = 0;
    setTimeout(() => {
        newMessage.style.opacity = 1;
    }, 10);

    // Atualiza o contador de mensagens
    messageCount++;
    document.getElementById('messageCount').textContent = `Total de mensagens: ${messageCount}`;

    // Reproduz som ao enviar mensagem
    const sendSound = document.getElementById('sendSound');
    sendSound.play();

    // Mostra o feedback de carregamento
    feedback.innerHTML = 'Enviando <span class="loading"></span>';
    feedback.style.opacity = 1;

    // Enviar a mensagem para um link
    const url = 'https://devericke.github.io/ISAU/'; // Substitua pelo seu link
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar a mensagem');
        }
        return response.json();
    })
    .then(data => {
        console.log('Mensagem enviada com sucesso:', data);
        feedback.innerHTML = 'Mensagem enviada com sucesso!'; // Mensagem de sucesso
        sendThankYouMessage(); // Envia mensagem de agradecimento
    })
    .catch((error) => {
        console.error('Erro:', error);
        feedback.innerHTML = 'Erro ao enviar a mensagem.'; // Mensagem de erro
    })
    .finally(() => {
        // Limpa o campo de entrada e esconde o feedback após 3 segundos
        setTimeout(() => {
            messageInput.value = '';
            nameInput.value = ''; // Limpa o campo de nome
            feedback.style.opacity = 0; // Esconde o feedback
        }, 3000);
    });

    // Armazena a mensagem no array
    messagesArray.push(formattedMessage);
});

document.getElementById('clearButton').addEventListener('click', function() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Limpa o histórico de mensagens
    messageCount = 0; // Reseta o contador
    document.getElementById('messageCount').textContent = 'Total de mensagens: 0';
});

function formatMessage(name, messageText, timeString) {
    // Formata a mensagem, convertendo links em HTML
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const formattedMessage = `${name ? `${name}: ` : ''}${messageText.replace(linkRegex, '<a href="$1" target="_blank">$1</a>')} [${timeString}]`;
    return formattedMessage;
}

function sendThankYouMessage() {
    if (messageCount % 5 === 0) { // A cada 5 mensagens, envia uma mensagem de agradecimento
        const thankYouMessage = thankYouMessages[Math.floor(Math.random() * thankYouMessages.length)];
        const messagesContainer = document.getElementById('messages');
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.textContent = thankYouMessage;
        messagesContainer.appendChild(newMessage);
        messageCount++; // Incrementa o contador
        document.getElementById('messageCount').textContent = `Total de mensagens: ${messageCount}`;
    }
}

// Alternar tema
document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode'); // Alterna a classe de tema escuro
    const buttonText = this.innerText === 'Tema Escuro' ? 'Tema Claro' : 'Tema Escuro';
    this.innerText = buttonText; // Atualiza o texto do botão
});

// Emojis (simples)
document.getElementById('emojiButton').addEventListener('click', function() {
    const emojiList = ['😊', '😂', '😍', '😢', '😡', '👍', '🎉'];
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    const messageInput = document.getElementById('messageInput');
    messageInput.value += randomEmoji; // Adiciona emoji ao campo de entrada
});
