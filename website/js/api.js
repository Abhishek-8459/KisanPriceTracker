/**
 * API Client for Krushi Pravah
 * Handles all communication with the backend API
 */

// Base URL for API endpoints
const API_BASE_URL = '/api'; // Change this to match your backend API URL

/**
 * Generic function to make API requests
 * @param {string} endpoint - API endpoint
 * @param {Object} params - URL parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
async function apiRequest(endpoint, params = {}) {
    // Build URL with query parameters
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        // Return null to indicate an error occurred
        return null;
    }
}

/**
 * Get vegetable data
 * @param {string} vegetable - Optional vegetable name
 * @param {string} market - Market name
 * @returns {Promise} - Promise that resolves to vegetable data
 */
async function getVegetableData(vegetable = null, market = "अपना बाजार मुंबई") {
    const params = { market };
    if (vegetable) {
        params.vegetable = vegetable;
    }
    
    return await apiRequest('vegetable-data', params);
}

/**
 * Get market data for a vegetable
 * @param {string} vegetable - Vegetable name
 * @param {string} market - Optional market name for details
 * @param {boolean} details - Whether to get detailed information
 * @returns {Promise} - Promise that resolves to market data
 */
async function getMarketData(vegetable = "टोमॅटो", market = null, details = false) {
    const params = { vegetable, details: details.toString() };
    if (market) {
        params.market = market;
    }
    
    return await apiRequest('market-data', params);
}

/**
 * Get price trend data
 * @param {string} vegetable - Vegetable name
 * @param {string} market - Market name
 * @param {string} timeframe - Timeframe (daily, weekly, monthly)
 * @returns {Promise} - Promise that resolves to trend data
 */
async function getTrendData(vegetable, market, timeframe) {
    const params = {
        vegetable,
        market,
        timeframe
    };
    
    return await apiRequest('trend-data', params);
}

/**
 * Get demand and supply data
 * @param {string} vegetable - Vegetable name
 * @returns {Promise} - Promise that resolves to demand-supply data
 */
async function getDemandSupplyData(vegetable) {
    const params = { vegetable };
    
    return await apiRequest('demand-supply-data', params);
}

/**
 * Get current data date from the API
 * @returns {Promise} - Promise that resolves to the current date
 */
async function getCurrentDate() {
    return await apiRequest('current-date');
}

// Export all functions
export {
    getVegetableData,
    getMarketData,
    getTrendData,
    getDemandSupplyData,
    getCurrentDate
};