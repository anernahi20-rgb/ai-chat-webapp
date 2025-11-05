# 🤖 AI Chat Web Application

A lightweight, responsive AI chat web application built with vanilla HTML, CSS, and JavaScript. Features Groq API integration with automatic GitHub Actions deployment to GitHub Pages.

## ✨ Features

- **🎨 Modern UI/UX**: Clean, responsive design with gradient backgrounds and smooth animations
- **🤖 AI Integration**: Powered by Groq's LLaMA 3.1 8B model for intelligent responses
- **🛡️ Demo Mode**: Works without API key using predefined responses
- **📱 Mobile-Friendly**: Fully responsive design for all devices
- **⚡ Real-time Interactions**: Typing indicators and smooth message flow
- **🔒 Secure**: API key stored locally in browser storage
- **🚀 Auto-Deploy**: Continuous deployment via GitHub Actions

## 🚀 Live Demo

The application is automatically deployed to GitHub Pages: 
**[https://anernahi20-rgb.github.io/ai-chat-webapp/](https://anernahi20-rgb.github.io/ai-chat-webapp/)**

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI API**: Groq API (LLaMA 3.1 8B Instant)
- **Deployment**: GitHub Actions + GitHub Pages
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Icons**: Font Awesome 6.0

## 📁 Project Structure

```
ai-chat-webapp/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
└── README.md           # Project documentation
```

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/anernahi20-rgb/ai-chat-webapp.git
cd ai-chat-webapp
```

### 2. Local Development
Simply open `index.html` in your browser or use a local server:

```bash
# Using Node.js http-server
npx http-server . -p 3000

# Using Python
python -m http.server 3000

# Using PHP
php -S localhost:3000
```

### 3. Get Groq API Key (Optional)
1. Visit [Groq Console](https://console.groq.com/keys)
2. Create a free account
3. Generate an API key
4. Enter the key in the application for full AI functionality

## 🔧 Configuration

### Environment Setup for GitHub Actions

1. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: "GitHub Actions"
   - The workflow will automatically deploy on push to main branch

2. **Workflow Triggers**:
   - Push to `main` branch
   - Pull requests to `main` branch
   - Manual workflow dispatch

### Customization

#### Modify AI Model
In `script.js`, change the model parameter:
```javascript
model: 'llama-3.1-8b-instant'  // or 'mixtral-8x7b-32768', 'llama-3.1-70b-versatile'
```

#### Update Styling
Modify colors in `styles.css`:
```css
/* Change gradient colors */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

#### Add Custom Responses
Extend demo responses in `script.js`:
```javascript
const demoResponses = {
    'your-keyword': 'Your custom response',
    // ... existing responses
};
```

## 🌟 Key Features Explained

### AI Integration
- **Primary**: Groq API with LLaMA 3.1 8B model
- **Fallback**: Intelligent demo responses for common queries
- **Error Handling**: Graceful degradation when API is unavailable

### User Experience
- **Typing Indicators**: Visual feedback during AI processing
- **Message Animation**: Smooth fade-in animations for new messages
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Keyboard navigation and screen reader friendly

### Development Features
- **Zero Dependencies**: Pure vanilla JavaScript
- **Modern ES6+**: Classes, async/await, template literals
- **Local Storage**: API key persistence
- **Error Boundaries**: Comprehensive error handling

## 🚀 Deployment

The app automatically deploys to GitHub Pages when you push to the main branch:

1. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Update chat application"
   git push origin main
   ```

2. **GitHub Actions**:
   - Validates HTML, CSS, and JavaScript
   - Creates deployment package
   - Deploys to GitHub Pages
   - Verifies deployment

3. **Access**:
   - Your app will be available at: `https://your-username.github.io/ai-chat-webapp/`

## 🧪 Testing

### Local Testing
1. Open the application in multiple browsers
2. Test with and without API key
3. Verify responsive design on different screen sizes
4. Test error scenarios (network issues, invalid API key)

### API Testing
```javascript
// Test API integration
console.log('Testing Groq API...');
fetch('https://api.groq.com/openai/v1/models', {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
})
.then(response => response.json())
.then(data => console.log('Available models:', data));
```

## 🛡️ Security Considerations

- API keys are stored in browser's localStorage (client-side only)
- No server-side API key exposure
- HTTPS enforcement for API calls
- Input sanitization for user messages
- XSS protection through proper HTML escaping

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 API Usage

### Demo Mode Queries
Try these queries without an API key:
- "hello" or "hi"
- "what can you do"
- "help"
- "github"
- "api"

### With API Key
Ask any question you'd ask a regular AI assistant!

## 🐛 Troubleshooting

### Common Issues

1. **GitHub Actions failing**:
   - Check if GitHub Pages is enabled in repository settings
   - Verify workflow permissions

2. **API not working**:
   - Verify API key is correct
   - Check network connectivity
   - Ensure sufficient API credits

3. **Styling issues**:
   - Clear browser cache
   - Check CSS file loading
   - Verify Font Awesome CDN

## 📊 Performance

- **Loading Time**: < 2 seconds on average connection
- **Bundle Size**: ~15KB total (HTML + CSS + JS)
- **API Response**: 1-3 seconds depending on model and query complexity
- **Mobile Performance**: Optimized for 3G+ connections

## 🔄 Version History

- **v1.0.0**: Initial release with Groq API integration
- **Features**: Chat interface, GitHub Actions deployment, responsive design

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for providing fast AI inference
- [GitHub Actions](https://github.com/features/actions) for CI/CD
- [Font Awesome](https://fontawesome.com/) for icons
- [GitHub Pages](https://pages.github.com/) for free hosting

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/anernahi20-rgb/ai-chat-webapp/issues) page
2. Create a new issue with detailed description
3. Include browser, OS, and error details

---

**Built with ❤️ by [anernahi20-rgb](https://github.com/anernahi20-rgb)**

*Ready to chat with AI? [Try the live demo!](https://anernahi20-rgb.github.io/ai-chat-webapp/)*