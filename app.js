document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Obtener o generar sessionID
    let sessionId = localStorage.getItem('sessionId') || null;

    function appendMessage(content, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messageElement.textContent = content;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Obtener o generar sessionID
    let sessionId = localStorage.getItem('sessionId') || null;

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
                const headers = {
                    "Content-Type": "application/json"
                };

                if (sessionId) {
                    headers["x-session-id"] = sessionId;
                }
                const response = await fetch("https://chatbotpage.ajroit-wa.workers.dev/", {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({ message: message })
                });

                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.status}`);
                }

                 // Guardar sessionId
                sessionId = response.headers.get('x-session-id');
                localStorage.setItem('sessionId', sessionId);

                const data = await response.json();
                appendMessage(data.botResponse || "Lo siento, no pude generar una respuesta.");
            } catch (error) {
                console.error("Error:", error);
                appendMessage("Lo siento, ocurrió un error al procesar tu mensaje.");
            }
        }
    }

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            appendMessage(message, true);
            userInput.value = '';
            userInput.focus();

            try {
                const headers = {
                    "Content-Type": "application/json"
                }

                if (sessionId) {
                    headers["x-session-id"] = sessionId;
                }
                const response = await fetch("https://chatbotpage.ajroit-wa.workers.dev/", {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({ message: message })
                });

                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.status}`);
                }

                // Guardar sessionId
                sessionId = response.headers.get('x-session-id')
                localStorage.setItem('sessionId', sessionId);


                const data = await response.json();
                appendMessage(data.botResponse || "Lo siento, no pude generar una respuesta.");
            } catch (error) {
                console.error("Error:", error);
                appendMessage("Lo siento, ocurrió un error al procesar tu mensaje.");
            }
        }
    } 
 
    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
