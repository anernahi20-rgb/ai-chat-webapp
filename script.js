// AI Chat Web Application
// Author: anernahi20-rgb
// Description: Lightweight AI chat using Groq API with fallback demo responses

class AIChatApp {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.apiKeyInput = document.getElementById('apiKey');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.initializeEventListeners();
        this.loadApiKey();
    }
    
    initializeEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key press
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Save API key to localStorage
        this.apiKeyInput.addEventListener('change', () => this.saveApiKey());
        
        // Auto-resize input
        this.userInput.addEventListener('input', (e) => {
            this.adjustInputHeight(e.target);
        });
    }
    
    loadApiKey() {
        const savedApiKey = localStorage.getItem('groq-api-key');
        if (savedApiKey) {
            this.apiKeyInput.value = savedApiKey;
        }
    }
    
    saveApiKey() {
        const apiKey = this.apiKeyInput.value.trim();
        if (apiKey) {
            localStorage.setItem('groq-api-key', apiKey);
        } else {
            localStorage.removeItem('groq-api-key');
        }
    }
    
    adjustInputHeight(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
    
    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        // Disable input while processing
        this.setInputState(false);
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input
        this.userInput.value = '';
        this.adjustInputHeight(this.userInput);
        
        // Show typing indicator
        this.showTypingIndicator(true);
        
        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            this.addMessage(response, 'ai');
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.addMessage('Sorry, I encountered an error. Please try again.', 'ai', true);
        } finally {
            // Hide typing indicator and re-enable input
            this.showTypingIndicator(false);
            this.setInputState(true);
        }
    }
    
    async getAIResponse(message) {
        const apiKey = this.apiKeyInput.value.trim();
        
        if (!apiKey) {
            // Demo mode - return predefined responses
            return this.getDemoResponse(message);
        }
        
        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.1-8b-instant',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful AI assistant. Provide concise, accurate, and friendly responses. Keep your answers informative but not too lengthy.'
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Groq API error:', error);
            return this.getDemoResponse(message);
        }
    }
    
    getDemoResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Demo responses for common queries
        const demoResponses = {
            'hello': 'Hello! I\'m your AI assistant. I\'m currently running in demo mode. To access the full AI capabilities, please add your Groq API key above.',
            'hi': 'Hi there! How can I help you today? Note: I\'m in demo mode without an API key.',
            'how are you': 'I\'m doing well, thank you! I\'m an AI assistant ready to help you. Currently running in demo mode.',
            'what can you do': 'I can help you with various questions and tasks like:\n\n• Answering questions\n• Providing explanations\n• Writing assistance\n• Problem-solving\n• And much more!\n\nAdd your Groq API key to unlock full AI capabilities.',
            'github': 'This web application is built with HTML, CSS, and JavaScript, and deployed using GitHub Actions. You can find the source code in the repository!',
            'api': 'This app uses the Groq API for AI responses. Get your free API key from console.groq.com to enable full functionality.',
            'help': 'I\'m here to help! You can ask me questions about various topics. For the best experience, add your Groq API key in the field above.'
        };
        
        // Check for keyword matches
        for (const [keyword, response] of Object.entries(demoResponses)) {
            if (lowerMessage.includes(keyword)) {
                return response;
            }
        }
        
        // Default demo response
        return `I received your message: "${message}"\n\nI'm currently in demo mode. To get intelligent AI responses, please:\n\n1. Get a free API key from https://console.groq.com/keys\n2. Enter it in the API key field above\n3. Ask your question again!\n\nThe app will then use Groq's LLaMA model to provide helpful responses.`;
    }
    
    addMessage(text, sender, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message${isError ? ' error-message' : ''}`;
        
        const icon = sender === 'ai' ? 'fas fa-robot' : 'fas fa-user';
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="${icon} message-icon"></i>
                <div class="message-text">${this.formatMessage(text)}</div>
            </div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    formatMessage(text) {
        // Convert line breaks to HTML
        text = text.replace(/\n/g, '<br>');
        
        // Make URLs clickable
        text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        
        // Make bullet points look better
        text = text.replace(/^• /gm, '• ');
        
        return text;
    }
    
    showTypingIndicator(show) {
        this.typingIndicator.style.display = show ? 'flex' : 'none';
        if (show) {
            this.scrollToBottom();
        }
    }
    
    setInputState(enabled) {
        this.userInput.disabled = !enabled;
        this.sendButton.disabled = !enabled;
        
        if (enabled) {
            this.userInput.focus();
        }
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIChatApp();
});

// Global function for HTML onclick (backwards compatibility)
function sendMessage() {
    // This will be handled by the class event listeners
    document.getElementById('sendButton').click();
}