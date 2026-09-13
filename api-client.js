/**
 * AK Media India - API Client
 * ==========================
 * Client-side JavaScript for interacting with the AK Media India API
 */

class AKMediaAPI {
    constructor(baseURL = 'http://localhost:3000/api') {
        this.baseURL = baseURL;
    }

    // Helper method for fetch requests
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return { success: true, data };
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, error: error.message };
        }
    }

    // Health check
    async healthCheck() {
        return this.request('/health');
    }

    // Request brand consultation
    async requestBrandQuote(formData) {
        return this.request('/brands/quote', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
    }

    // Apply as creator
    async applyAsCreator(formData) {
        return this.request('/creators/apply', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
    }

    // Get platform statistics
    async getStats() {
        return this.request('/stats');
    }

    // Get creators
    async getCreators(options = {}) {
        const params = new URLSearchParams(options).toString();
        const endpoint = params ? `/creators?${params}` : '/creators';
        return this.request(endpoint);
    }

    // Get brands
    async getBrands(options = {}) {
        const params = new URLSearchParams(options).toString();
        const endpoint = params ? `/brands?${params}` : '/brands';
        return this.request(endpoint);
    }

    // Get campaigns
    async getCampaigns(options = {}) {
        const params = new URLSearchParams(options).toString();
        const endpoint = params ? `/campaigns?${params}` : '/campaigns';
        return this.request(endpoint);
    }

    // Get API documentation
    async getDocs() {
        return this.request('/docs');
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AKMediaAPI;
}

// Initialize global API client
const api = new AKMediaAPI();

// ============================================
// FORM HANDLERS (Client-side integration)
// ============================================

// Handle brand quote form submission
document.addEventListener('DOMContentLoaded', () => {
    const brandForm = document.getElementById('brand-quote-form');
    const creatorForm = document.getElementById('creator-quote-form');

    if (brandForm) {
        brandForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: brandForm.querySelector('input[name="name"]').value,
                email: brandForm.querySelector('input[name="email"]').value,
                phone: brandForm.querySelector('input[name="phone"]').value,
                brand: brandForm.querySelector('input[name="brand"]').value,
                goals: brandForm.querySelector('textarea[name="goals"]').value,
                budget: brandForm.querySelector('input[name="budget"]').value,
                campaignType: brandForm.querySelector('select[name="campaignType"]').value
            };

            const response = await api.requestBrandQuote(formData);

            if (response.success) {
                alert(response.data.message);
                brandForm.reset();
            } else {
                alert(`Error: ${response.error}`);
            }
        });
    }

    if (creatorForm) {
        creatorForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: creatorForm.querySelector('input[name="name"]').value,
                email: creatorForm.querySelector('input[name="email"]').value,
                platform: creatorForm.querySelector('input[name="platform"]').value,
                followers: creatorForm.querySelector('input[name="followers"]').value,
                category: creatorForm.querySelector('input[name="category"]').value,
                interests: creatorForm.querySelector('textarea[name="interests"]').value.split(',').map(i => i.trim())
            };

            const response = await api.applyAsCreator(formData);

            if (response.success) {
                alert(response.data.message);
                creatorForm.reset();
            } else {
                alert(`Error: ${response.error}`);
            }
        });
    }
});