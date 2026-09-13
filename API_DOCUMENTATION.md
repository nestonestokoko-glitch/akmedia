# AK Media India API Documentation

## Overview

This document provides comprehensive documentation for the AK Media India API. The API enables seamless integration between the frontend website and backend services for brand partnerships and creator network management.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API operates without authentication for demonstration purposes. In production, implement API keys or JWT-based authentication.

## Rate Limiting

Rate limiting will be implemented in production with the following limits:
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

---

## Endpoints

### 1. Health Check

**GET** `/health`

Check API server health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. Request Brand Quote

**POST** `/brands/quote`

Request a consultation for your brand campaign.

**Request Body:**
```json
{
  "name": "John Smith (required)",
  "email": "john@brand.com (required)",
  "phone": "+91 98765 43210 (optional)",
  "brand": "TechCorp (required)",
  "goals": "Increase brand awareness (required)",
  "budget": "₹5-10 lakhs (optional)",
  "campaignType": "Influencer marketing (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! We will contact you within 24 hours to discuss your campaign strategy.",
  "data": {
    "id": "1705312800000",
    "name": "John Smith",
    "brand": "TechCorp",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Required fields are missing"
}
```

---

### 3. Apply as Creator

**POST** `/creators/apply`

Apply to join the AK Media India creator network.

**Request Body:**
```json
{
  "name": "Jane Doe (required)",
  "email": "jane@creator.com (required)",
  "platform": "YouTube (required)",
  "followers": 45000 (required)",
  "category": "Tech Reviews (optional)",
  "interests": ["Technology", "Gaming", "Tutorials"] (optional)
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your application! We will review your profile and contact you within 5 business days.",
  "data": {
    "id": "1705312800000",
    "name": "Jane Doe",
    "platform": "YouTube",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 4. Get Platform Statistics

**GET** `/stats`

Retrieve platform-wide statistics and metrics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCreators": 2000,
    "totalBrands": 100,
    "activeCampaigns": 150,
    "creatorsApplied": 800,
    "brandQuotes": 120,
    "creatorVerificationRate": "85%",
    "averageCampaignROI": "3.2x"
  }
}
```

---

### 5. Get Creator Network

**GET** `/creators`

Retrieve approved creators from the network.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | number | 10 | Maximum number of results |
| category | string | - | Filter by category |

**Example:**
```
GET /creators?limit=20&category=Tech
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "creator_001",
      "name": "Jane Doe",
      "platform": "YouTube",
      "followers": 450000,
      "category": "Tech Reviews",
      "verified": true
    }
  ]
}
```

---

### 6. Get Brand Partners

**GET** `/brands`

Retrieve brand partners who have worked with AK Media.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | number | 10 | Maximum number of results |

**Example:**
```
GET /brands?limit=20
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": "brand_001",
      "name": "Filmora",
      "category": "Technology"
    }
  ]
}
```

---

### 7. Get Campaign Examples

**GET** `/campaigns`

Retrieve successful campaign examples.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | number | 10 | Maximum number of results |

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "campaign_001",
      "brand": "Hostinger",
      "creator": "Tech Creator",
      "goal": "Website signups",
      "results": "50K+ qualified signups"
    }
  ]
}
```

---

### 8. API Documentation

**GET** `/docs`

Get the complete API documentation as JSON.

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Optional detailed error (development only)"
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## Webhooks (Coming Soon)

The API will support webhooks for:
- Quote status updates
- Creator application status
- Campaign milestone tracking

---

## CORS Configuration

```javascript
{
  "origin": "http://localhost:3000",
  "credentials": true
}
```

---

## Rate Limiting Headers

Response headers include:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705313100
```

---

## SDK Usage Examples

### JavaScript (Browser)

```javascript
const api = new AKMediaAPI('http://localhost:3000/api');

// Submit brand quote
const response = await api.requestBrandQuote({
    name: 'John Smith',
    email: 'john@brand.com',
    phone: '+91 98765 43210',
    brand: 'TechCorp',
    goals: 'Increase brand awareness'
});

if (response.success) {
    console.log('Quote submitted:', response.data);
}
```

### Node.js (Backend)

```javascript
const fetch = require('node-fetch');

const submitBrandQuote = async (formData) => {
    const response = await fetch('http://localhost:3000/api/brands/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    return response.json();
};
```

---

## Data Models

### Brand Quote
```typescript
interface BrandQuote {
  id: string;
  name: string;
  email: string;
  phone: string;
  brand: string;
  goals: string;
  budget?: string;
  campaignType?: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'converted';
}
```

### Creator Application
```typescript
interface CreatorApplication {
  id: string;
  name: string;
  email: string;
  platform: string;
  followers: number;
  category?: string;
  interests?: string[];
  createdAt: string;
  status: 'pending_review' | 'approved' | 'rejected';
  verificationRequired: boolean;
}
```

---

## Versioning

Current API Version: `1.0.0`

Future versions will be versioned using URL path: `/v1/api/...`

---

## Support

For API support, contact: `api@akmediaindia.com`