document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    function appendMessage(content, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messageElement.textContent = content;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            appendMessage(message, true);
            userInput.value = '';
            userInput.focus();

            try {
                const response = await fetch("https://chatbotpage.ajroit-wa.workers.dev/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message: message })
                });

                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.status}`);
                }

                const data = await response.json();
                appendMessage(data.botResponse || "Lo siento, no pude generar una respuesta.");
            } catch (error) {
                console.error("Error:", error);
                appendMessage("Lo siento, ocurrió un error al procesar tu mensaje.");
            }
        }
    }

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});

