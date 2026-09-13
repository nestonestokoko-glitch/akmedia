/**
 * AK Media India - Fullstack Backend
 * =====================================
 * A lightweight Express.js server for form handling,
 * data management, and API endpoints
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Security middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// ============================================
// DATA STORE (In-memory for demo)
// ============================================

const db = {
    brandQuotes: [],
    creatorApplications: [],
    campaigns: [],
    creators: [],
    brands: []
};

// Success messages
const SUCCESS_MESSAGES = {
    brandQuote: "Thank you! We will contact you within 24 hours to discuss your campaign strategy.",
    creatorApplication: "Thank you for your application! We will review your profile and contact you within 5 business days."
};

// ============================================
// ROUTES
// ============================================

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'AK Media India API',
        version: '1.0.0',
        endpoints: {
            POST: {
                '/api/brands/quote': 'Request brand consultation',
                '/api/creators/apply': 'Apply as a creator'
            },
            GET: {
                '/api/stats': 'Get platform statistics',
                '/api/creators': 'Get creator network',
                '/api/brands': 'Get brand partners',
                '/api/campaigns': 'Get campaign examples'
            }
        }
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ============================================
// BRAND QUOTE ENDPOINT
// ============================================

app.post('/api/brands/quote', (req, res) => {
    const { name, email, phone, brand, goals, budget, campaignType } = req.body;

    // Validation
    if (!name || !email || !brand || !goals) {
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing'
        });
    }

    // Create quote record
    const quote = {
        id: Date.now().toString(),
        name,
        email,
        phone: phone || 'N/A',
        brand,
        goals,
        budget: budget || 'Not specified',
        campaignType: campaignType || 'Influencer marketing',
        createdAt: new Date().toISOString(),
        status: 'pending',
        ip: req.ip
    };

    // Store in database
    db.brandQuotes.push(quote);

    // Send response
    res.json({
        success: true,
        message: SUCCESS_MESSAGES.brandQuote,
        data: {
            id: quote.id,
            name: quote.name,
            brand: quote.brand,
            createdAt: quote.createdAt
        }
    });

    // TODO: Add email notification, SMS alert, CRM integration
});

// ============================================
// CREATOR APPLICATION ENDPOINT
// ============================================

app.post('/api/creators/apply', (req, res) => {
    const { name, email, platform, followers, category, interests } = req.body;

    // Validation
    if (!name || !email || !platform || !followers) {
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing'
        });
    }

    // Create application record
    const application = {
        id: Date.now().toString(),
        name,
        email,
        platform,
        followers: parseInt(followers),
        category: category || 'General',
        interests: interests || [],
        createdAt: new Date().toISOString(),
        status: 'pending_review',
        verificationRequired: true,
        ip: req.ip
    };

    // Store in database
    db.creatorApplications.push(application);

    // Send response
    res.json({
        success: true,
        message: SUCCESS_MESSAGES.creatorApplication,
        data: {
            id: application.id,
            name: application.name,
            platform: application.platform,
            createdAt: application.createdAt
        }
    });

    // TODO: Add email notification, verification process, CRM integration
});

// ============================================
// GET ENDPOINTS
// ============================================

// Get statistics
app.get('/api/stats', (req, res) => {
    res.json({
        success: true,
        data: {
            totalCreators: db.creators.length + db.creatorApplications.length,
            totalBrands: db.brands.length + db.brandQuotes.length,
            activeCampaigns: db.campaigns.length,
            creatorsApplied: db.creatorApplications.length,
            brandQuotes: db.brandQuotes.length,
            creatorVerificationRate: '85%', // Mock percentage
            averageCampaignROI: '3.2x' // Mock ROI
        }
    });
});

// Get creator network
app.get('/api/creators', (req, res) => {
    const { limit = 10, category = null } = req.query;

    let creators = db.creators;

    if (category) {
        creators = creators.filter(c => c.category === category);
    }

    res.json({
        success: true,
        count: creators.length,
        data: creators.slice(0, parseInt(limit))
    });
});

// Get brand partners
app.get('/api/brands', (req, res) => {
    const { limit = 10 } = req.query;

    let brands = db.brands;

    res.json({
        success: true,
        count: brands.length,
        data: brands.slice(0, parseInt(limit))
    });
});

// Get campaign examples
app.get('/api/campaigns', (req, res) => {
    const { limit = 10 } = req.query;

    let campaigns = db.campaigns;

    res.json({
        success: true,
        count: campaigns.length,
        data: campaigns.slice(0, parseInt(limit))
    });
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// ============================================
// API DOCUMENTATION
// ============================================

app.get('/api/docs', (req, res) => {
    res.json({
        title: 'AK Media India API Documentation',
        version: '1.0.0',
        description: 'API for AK Media India influencer marketing platform',

        endpoints: {
            'POST /api/brands/quote': {
                description: 'Request a brand consultation',
                body: {
                    'name': 'string (required)',
                    'email': 'string (required)',
                    'phone': 'string (optional)',
                    'brand': 'string (required)',
                    'goals': 'string (required)',
                    'budget': 'string (optional)',
                    'campaignType': 'string (optional)'
                },
                response: {
                    success: true,
                    message: 'Success message',
                    data: { id, name, brand, createdAt }
                }
            },

            'POST /api/creators/apply': {
                description: 'Apply to join the creator network',
                body: {
                    'name': 'string (required)',
                    'email': 'string (required)',
                    'platform': 'string (required)',
                    'followers': 'number (required)',
                    'category': 'string (optional)',
                    'interests': 'array(string) (optional)'
                },
                response: {
                    success: true,
                    message: 'Success message',
                    data: { id, name, platform, createdAt }
                }
            },

            'GET /api/stats': {
                description: 'Get platform statistics',
                response: {
                    success: true,
                    data: {
                        totalCreators: 'number',
                        totalBrands: 'number',
                        activeCampaigns: 'number',
                        creatorsApplied: 'number',
                        brandQuotes: 'number'
                    }
                }
            },

            'GET /api/creators': {
                description: 'Get creator network',
                queries: {
                    limit: 'number (default: 10)',
                    category: 'string (optional)'
                }
            },

            'GET /api/brands': {
                description: 'Get brand partners',
                queries: {
                    limit: 'number (default: 10)'
                }
            },

            'GET /api/campaigns': {
                description: 'Get campaign examples',
                queries: {
                    limit: 'number (default: 10)'
                }
            },

            'GET /api/health': {
                description: 'Health check endpoint'
            }
        }
    });
});

// ============================================
// SERVER START
// ============================================

app.listen(PORT, () => {
    console.log(`🚀 AK Media India API Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 API Docs: http://localhost:${PORT}/api/docs`);
});

module.exports = app;