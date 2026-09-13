# AK Media India - Fullstack Platform

> **Influencer Marketing & Creator Growth Platform**

A premium fullstack application connecting brands with authentic creators for successful influencer marketing campaigns.

---

## 🏗️ Architecture

```
akmedia2/
├── index.html          # Frontend UI (HTML5, CSS3, Vanilla JS)
├── styles.css          # Styled with CSS custom properties (8px spacing system)
├── script.js           # Frontend interactivity
├── server.js           # Express.js backend API
├── api-client.js       # Frontend API client
├── package.json        # Project configuration
├── .env                # Environment variables
└── assets/             # Images, icons, static assets
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone and navigate to project
cd akmedia2

# Install dependencies
npm install

# Set environment variables
echo "PORT=3000" > .env
echo "NODE_ENV=development" >> .env
echo "FRONTEND_URL=http://localhost:8080" >> .env

# Start development server
npm run dev
```

### Production Build

```bash
# Start production server
npm start
```

The server will be available at `http://localhost:3000`

---

## 🔧 Development

### Run with Nodemon (Hot Reload)

```bash
npm run dev
```

### Lint Code

```bash
npm run lint
```

### API Testing

```bash
# Health check
curl http://localhost:3000/api/health

# Get API docs
curl http://localhost:3000/api/docs

# Get stats
curl http://localhost:3000/api/stats
```

---

## 📚 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/brands/quote` | POST | Request brand consultation |
| `/api/creators/apply` | POST | Apply as creator |
| `/api/stats` | GET | Platform statistics |
| `/api/creators` | GET | Creator network |
| `/api/brands` | GET | Brand partners |
| `/api/campaigns` | GET | Campaign examples |
| `/api/docs` | GET | API documentation |

---

## 🎨 Frontend Integration

### HTML Form Submission

```html
<form id="brand-form">
    <input name="name" type="text" required>
    <input name="email" type="email" required>
    <textarea name="goals"></textarea>
    <button type="submit">Submit</button>
</form>
```

### JavaScript API Client

```javascript
import AKMediaAPI from './api-client.js';

const api = new AKMediaAPI('http://localhost:3000/api');

document.getElementById('brand-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        goals: e.target.goals.value
    };

    const response = await api.requestBrandQuote(formData);

    if (response.success) {
        alert('Success!');
    }
});
```

---

## 🗄️ Data Store

The default in-memory database is suitable for development and testing.

### Production Database Setup

For production, integrate with:

```javascript
// MongoDB
const mongoose = require('mongoose');
await mongoose.connect(process.env.MONGODB_URI);

// PostgreSQL  
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Redis (caching)
const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });
```

---

## 🌐 Deployment

### Vercel (Frontend)

```bash
# Build frontend
npm run build

# Deploy to Vercel
vercel --prod
```

### Render / Railway (Fullstack)

```bash
# Set environment variables in dashboard
# PORT=3000
# NODE_ENV=production
# DATABASE_URL=your-db-connection

# Deploy
git push heroku main
```

### Docker Deployment

```bash
# Build image
docker build -t ak-media-india .

# Run container
docker run -p 3000:3000 ak-media-india
```

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 🛡️ Security & Compliance

- CORS enabled for specified origins
- Content Security Policy headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Rate limiting ready for production
- WCAG 2.1 AA compliant UI

---

## 📊 Monitoring

```bash
# Health check
GET /api/health

# Response
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🤝 Integration Examples

### React Component

```jsx
function BrandForm() {
  const [formData, setFormData] = useState({});
  const api = useMemo(() => new AKMediaAPI(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.requestBrandQuote(formData);
    // Handle response
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### Next.js API Route Proxy

```javascript
// pages/api/quote.js
import proxy from 'proxy';

export default async function handler(req, res) {
  const response = await proxy(
    'http://localhost:3000/api/brands/quote',
    {
      method: 'POST',
      body: JSON.stringify(req.body)
    }
  );
  res.status(response.status).json(response.data);
}
```

---

## 🧪 Testing

```bash
# Write tests with Jest
npm test

# Example test
describe('API', () => {
  test('should return health status', async () => {
    const response = await api.healthCheck();
    expect(response.success).toBe(true);
  });
});
```

---

## 📦 Environment Variables

Create `.env` file:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
MAIL_API_KEY=your-mail-service-api-key
```

---

## 📄 License

MIT License - AK Media India

---

## 📞 Support

- **API**: `api@akmediaindia.com`
- **Website**: `https://akmediaindia.com`
- **Documentation**: `/api/docs`

---

## Future Enhancements

- [ ] JWT Authentication
- [ ] Payment integration (Razorpay)
- [ ] Email notifications (Nodemailer)
- [ ] Email verification
- [ ] Image upload (Cloudinary)
- [ ] Real-time notifications (Socket.io)
- [ ] Analytics dashboard
- [ ] Admin panel