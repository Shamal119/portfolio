# Free Deployment Guide for Portfolio Chatbot

## 🚀 Free Deployment Options

### 1. **Railway** (Recommended - Easiest)
- **Free Tier**: $5 credit monthly (enough for small apps)
- **Pros**: Easy setup, automatic deployments, built-in environment variables
- **Setup**:
  1. Go to [railway.app](https://railway.app)
  2. Connect your GitHub repository
  3. Add environment variables: `GEMINI_API_KEY`
  4. Deploy automatically

### 2. **Render** (Great for Python)
- **Free Tier**: 750 hours/month, sleeps after 15min inactivity
- **Pros**: Great Python support, automatic SSL, custom domains
- **Setup**:
  1. Go to [render.com](https://render.com)
  2. Create new "Web Service"
  3. Connect GitHub repo
  4. Build Command: `pip install -r requirements.txt`
  5. Start Command: `python server.py`
  6. Add environment variable: `GEMINI_API_KEY`

### 3. **Heroku** (Classic Choice)
- **Free Tier**: Discontinued, but has $5/month Eco plan
- **Pros**: Mature platform, great documentation
- **Setup**:
  1. Install Heroku CLI
  2. `heroku create your-app-name`
  3. `heroku config:set GEMINI_API_KEY=your_key`
  4. `git push heroku main`

### 4. **Fly.io** (Developer Friendly)
- **Free Tier**: 3 shared-cpu-1x VMs, 256MB RAM each
- **Pros**: Global edge deployment, great performance
- **Setup**:
  1. Install flyctl CLI
  2. `fly launch` (creates fly.toml)
  3. `fly secrets set GEMINI_API_KEY=your_key`
  4. `fly deploy`

### 5. **PythonAnywhere** (Simple Hosting)
- **Free Tier**: Limited CPU seconds, basic plan
- **Pros**: Python-focused, easy setup
- **Setup**:
  1. Create account at [pythonanywhere.com](https://pythonanywhere.com)
  2. Upload your code
  3. Create web app with Flask/FastAPI
  4. Set environment variables

## 🔧 Environment Setup

### Required Environment Variables:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=production
```

### Getting Gemini API Key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and add to your deployment platform

## 📁 Project Structure for Deployment

```
portfolio/
├── server.py              # Main FastAPI server
├── requirements.txt       # Python dependencies
├── src/
│   └── data/
│       └── resumeData.json # Resume data
├── .env                   # Environment variables (local only)
└── README.md
```

## 🚀 Quick Start Commands

### Local Development:
```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
python server.py
```

### Production Deployment:
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with production settings
uvicorn server:app --host 0.0.0.0 --port $PORT
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit API keys to git
2. **CORS**: Configure allowed origins for production
3. **Rate Limiting**: Consider adding rate limiting for production
4. **HTTPS**: Most platforms provide SSL automatically

## 📊 Monitoring & Logs

- **Railway**: Built-in logs and metrics
- **Render**: Logs available in dashboard
- **Heroku**: `heroku logs --tail`
- **Fly.io**: `fly logs`

## 💡 Tips for Free Tiers

1. **Optimize for cold starts**: Keep startup time minimal
2. **Use environment variables**: Don't hardcode sensitive data
3. **Monitor usage**: Stay within free tier limits
4. **Consider sleep behavior**: Some platforms sleep inactive apps
5. **Use CDN**: For static assets if needed

## 🔄 Updating Your Frontend

After deploying your Python backend, update your frontend to point to the new API URL:

```javascript
// In your React components
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-app.railway.app'  // or your deployed URL
  : 'http://localhost:3001';
```

## 🆘 Troubleshooting

### Common Issues:
1. **Import errors**: Ensure all dependencies are in requirements.txt
2. **Port issues**: Use `PORT` environment variable
3. **API key errors**: Verify environment variables are set
4. **CORS errors**: Check CORS configuration
5. **Memory issues**: Optimize for free tier limits

### Debug Commands:
```bash
# Check if server starts locally
python server.py

# Test API endpoints
curl http://localhost:3001/health
curl -X POST http://localhost:3001/chat -H "Content-Type: application/json" -d '{"message":"Hello"}'
```
