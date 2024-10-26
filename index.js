document.getElementById('sendButton').addEventListener('click', function() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value;

    if (messageText.trim() === '') {
        alert('Por favor, digite uma mensagem.');
        return;
    }

    // Adiciona a mensagem ao chat
    const messagesContainer = document.getElementById('messages');
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.textContent = messageText;
    messagesContainer.appendChild(newMessage);

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
    })
    .catch((error) => {
        console.error('Erro:', error);
    });

    // Limpa o campo de entrada
    messageInput.value = '';
});
