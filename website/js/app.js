// Main JavaScript file for Krushi Pravah

// Global variables
let currentLanguage = "marathi"; // Default language
let currentPage = "home"; // Default page

// Sample data for initial display (this will be replaced by API calls to your backend)
const initialVegetableData = {
    "टोमॅटो": {"current_price": 40, "price_change": 5},
    "कांदा": {"current_price": 30, "price_change": -3},
    "बटाटा": {"current_price": 25, "price_change": 0},
    "वांगे": {"current_price": 35, "price_change": 2},
    "कोबी": {"current_price": 20, "price_change": -2},
    "फ्लॉवर": {"current_price": 45, "price_change": 7},
    "भेंडी": {"current_price": 60, "price_change": -4},
    "गाजर": {"current_price": 35, "price_change": 3}
};

// Make sure we have a default vegetable even if user selection fails
function getDefaultVegetable() {
    return "टोमॅटो";
}

// Make sure we have a default market even if user selection fails
function getDefaultMarket() {
    return "अपना बाजार मुंबई";
}

const initialMarketData = {
    "अपना बाजार मुंबई": 40,
    "पुणे बाजार": 38,
    "नागपूर बाजार": 34,
    "नाशिक बाजार": 32,
    "कोल्हापूर बाजार": 36
};

// DOM ready event
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initApp();
    
    // Add event listeners
    setupEventListeners();
});

/**
 * Initialize the application
 */
function initApp() {
    // Set initial language
    updatePageLanguage(currentLanguage);
    
    // Show home page by default
    navigateToPage('home');
    
    // Load initial data
    loadInitialData();
}

/**
 * Setup event listeners for interactive elements
 */
function setupEventListeners() {
    // Language toggle button
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
    
    // Navigation menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            navigateToPage(page);
        });
    });
    
    // Market and vegetable selectors on home page
    const marketSelect = document.getElementById('market-select');
    const vegetableSelect = document.getElementById('vegetable-select');
    
    if (marketSelect) {
        marketSelect.addEventListener('change', updateHomePageData);
    }
    
    if (vegetableSelect) {
        vegetableSelect.addEventListener('change', updateHomePageData);
    }
    
    // Market comparison page
    const comparisonVegSelect = document.getElementById('comparison-vegetable-select');
    if (comparisonVegSelect) {
        comparisonVegSelect.addEventListener('change', updateMarketComparisonData);
    }
    
    // Price trends page
    const trendVegSelect = document.getElementById('trend-vegetable-select');
    const trendMarketSelect = document.getElementById('trend-market-select');
    const trendTimeframeSelect = document.getElementById('trend-timeframe-select');
    
    if (trendVegSelect) {
        trendVegSelect.addEventListener('change', updatePriceTrendsData);
    }
    
    if (trendMarketSelect) {
        trendMarketSelect.addEventListener('change', updatePriceTrendsData);
    }
    
    if (trendTimeframeSelect) {
        trendTimeframeSelect.addEventListener('change', updatePriceTrendsData);
    }
    
    // Demand-supply page
    const demandVegSelect = document.getElementById('demand-vegetable-select');
    if (demandVegSelect) {
        demandVegSelect.addEventListener('change', updateDemandSupplyData);
    }
}

/**
 * Toggle between Marathi and English
 */
function toggleLanguage() {
    currentLanguage = currentLanguage === "marathi" ? "english" : "marathi";
    updatePageLanguage(currentLanguage);
    
    // Update page content based on new language
    if (currentPage === 'home') {
        updateHomePageData();
    } else if (currentPage === 'market-comparison') {
        updateMarketComparisonData();
    } else if (currentPage === 'price-trends') {
        updatePriceTrendsData();
    } else if (currentPage === 'demand-supply') {
        updateDemandSupplyData();
    }
}

/**
 * Navigate to a specific page
 * @param {string} page - Page identifier
 */
function navigateToPage(page) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(`${page}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
        currentPage = page;
        
        // Update menu active state
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === page) {
                item.classList.add('active');
            }
        });
        
        // Load page-specific data
        if (page === 'home') {
            updateHomePageData();
        } else if (page === 'market-comparison') {
            updateMarketComparisonData();
        } else if (page === 'price-trends') {
            updatePriceTrendsData();
        } else if (page === 'demand-supply') {
            updateDemandSupplyData();
        }
    }
}

/**
 * Load initial data for the application
 */
function loadInitialData() {
    // Populate select options for all pages
    populateSelectOptions();
    
    // Update last updated info
    updateLastUpdatedInfo();
}

/**
 * Populate all select dropdowns with options
 */
function populateSelectOptions() {
    // Vegetable options
    const vegetableOptions = [
        "टोमॅटो", "कांदा", "बटाटा", "वांगे", "कोबी", "फ्लॉवर", "भेंडी", "गाजर"
    ];
    
    // Market options
    const marketOptions = [
        "पुणे बाजार"
    ];
    
    // Timeframe options
    const timeframeOptions = [
        "दैनिक", "साप्ताहिक", "मासिक"
    ];
    
    // Populate vegetable selects
    const vegetableSelects = [
        document.getElementById('vegetable-select'),
        document.getElementById('comparison-vegetable-select'),
        document.getElementById('trend-vegetable-select'),
        document.getElementById('demand-vegetable-select')
    ];
    
    vegetableSelects.forEach(select => {
        if (select) {
            populateSelect(select, vegetableOptions);
        }
    });
    
    // Populate market selects
    const marketSelects = [
        document.getElementById('market-select'),
        document.getElementById('trend-market-select')
    ];
    
    marketSelects.forEach(select => {
        if (select) {
            populateSelect(select, marketOptions);
        }
    });
    
    // Populate timeframe select
    const timeframeSelect = document.getElementById('trend-timeframe-select');
    if (timeframeSelect) {
        populateSelect(timeframeSelect, timeframeOptions);
    }
}

/**
 * Populate a select element with options
 * @param {HTMLElement} select - Select element to populate
 * @param {Array} options - Array of option values
 */
function populateSelect(select, options) {
    // Clear existing options
    select.innerHTML = '';
    
    // Add new options
    options.forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option;
        optElement.textContent = translate(option, currentLanguage);
        optElement.setAttribute('data-translate-value', option);
        select.appendChild(optElement);
    });
}

/**
 * Update the last updated info with current date and data source
 */
function updateLastUpdatedInfo() {
    const lastUpdatedElements = document.querySelectorAll('.last-updated');
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const lastUpdatedText = `${translate('अंतिम अद्यतनित', currentLanguage)}: ${formattedDate} ${formattedTime} | ${translate('डेटा स्त्रोत', currentLanguage)}: ${translate('पुणे APMC वेबसाइट', currentLanguage)}`;
    
    lastUpdatedElements.forEach(element => {
        element.textContent = lastUpdatedText;
    });
}

/**
 * Update home page data based on selections
 */
function updateHomePageData() {
    const marketSelect = document.getElementById('market-select');
    const vegetableSelect = document.getElementById('vegetable-select');
    
    // Make sure we have valid selections, using defaults if needed
    let selectedMarket = getDefaultMarket();
    let selectedVegetable = getDefaultVegetable();
    
    if (marketSelect && marketSelect.value) {
        selectedMarket = marketSelect.value;
    }
    
    if (vegetableSelect && vegetableSelect.value) {
        selectedVegetable = vegetableSelect.value;
    }
    
    // Update current price section
    updateCurrentPriceSection(selectedVegetable, selectedMarket);
    
    // Update top vegetables section
    updateTopVegetablesSection(selectedMarket);
    
    // Update market comparison section
    updateQuickMarketComparisonSection(selectedVegetable);
}

/**
 * Update the current price section on the home page
 * @param {string} vegetable - Selected vegetable
 * @param {string} market - Selected market
 */
function updateCurrentPriceSection(vegetable, market) {
    // In a real implementation, you would fetch this data from your backend API
    // For now, we'll use the initial data
    
    const currentPriceIcon = document.getElementById('current-price-icon');
    const currentPriceVegName = document.getElementById('current-price-veg-name');
    const currentPriceValue = document.getElementById('current-price-value');
    const currentPriceChange = document.getElementById('current-price-change');
    
    if (!currentPriceIcon || !currentPriceVegName || !currentPriceValue || !currentPriceChange) return;
    
    // Get vegetable data (in real implementation, this would come from an API)
    const vegData = initialVegetableData[vegetable];
    
    // Apply market factor (simplified version of what's in the Python code)
    const marketFactors = {
        "अपना बाजार मुंबई": 1.0,
        "पुणे बाजार": 0.95,
        "नागपूर बाजार": 0.85,
        "नाशिक बाजार": 0.8,
        "कोल्हापूर बाजार": 0.9
    };
    
    const marketFactor = marketFactors[market] || 1.0;
    const adjustedPrice = vegData.current_price * marketFactor;
    
    // Update the UI
    currentPriceIcon.innerHTML = getVegetableIcon(vegetable);
    currentPriceVegName.textContent = translate(vegetable, currentLanguage);
    currentPriceValue.textContent = `₹ ${adjustedPrice.toFixed(2)}/kg`;
    
    // Price change indicator
    const priceChange = vegData.price_change;
    if (priceChange > 0) {
        currentPriceChange.className = 'price-increase';
        currentPriceChange.innerHTML = `▲ ₹${priceChange}/kg ${translate('गेल्या आठवड्यापासून', currentLanguage)}`;
    } else if (priceChange < 0) {
        currentPriceChange.className = 'price-decrease';
        currentPriceChange.innerHTML = `▼ ₹${Math.abs(priceChange)}/kg ${translate('गेल्या आठवड्यापासून', currentLanguage)}`;
    } else {
        currentPriceChange.className = 'price-stable';
        currentPriceChange.innerHTML = `→ ${translate('कोणताही बदल नाही', currentLanguage)}`;
    }
}

/**
 * Update the top vegetables section on the home page
 * @param {string} market - Selected market
 */
function updateTopVegetablesSection(market) {
    const topVegetablesContainer = document.getElementById('top-vegetables-container');
    if (!topVegetablesContainer) return;
    
    // Clear existing content
    topVegetablesContainer.innerHTML = '';
    
    // Get vegetable data (in real implementation, this would come from an API)
    // For now, we'll use the top 4 vegetables from our initial data
    const topVegetables = Object.entries(initialVegetableData).slice(0, 4);
    
    // Apply market factor
    const marketFactors = {
        "अपना बाजार मुंबई": 1.0,
        "पुणे बाजार": 0.95,
        "नागपूर बाजार": 0.85,
        "नाशिक बाजार": 0.8,
        "कोल्हापूर बाजार": 0.9
    };
    
    const marketFactor = marketFactors[market] || 1.0;
    
    // Create columns for each vegetable
    topVegetables.forEach(([veg, data]) => {
        const adjustedPrice = data.current_price * marketFactor;
        
        const col = document.createElement('div');
        col.className = 'col-3';
        
        const card = document.createElement('div');
        card.className = 'card text-center';
        
        // Price change indicator HTML
        let priceChangeHtml = '';
        if (data.price_change > 0) {
            priceChangeHtml = `<span class="price-increase">▲ ₹${data.price_change}</span>`;
        } else if (data.price_change < 0) {
            priceChangeHtml = `<span class="price-decrease">▼ ₹${Math.abs(data.price_change)}</span>`;
        } else {
            priceChangeHtml = `<span class="price-stable">→</span>`;
        }
        
        card.innerHTML = `
            <div class="vegetable-icon">${getVegetableIcon(veg)}</div>
            <h4 data-translate>${translate(veg, currentLanguage)}</h4>
            <p class="price">₹ ${adjustedPrice.toFixed(2)}/kg</p>
            <p>${priceChangeHtml}</p>
        `;
        
        col.appendChild(card);
        topVegetablesContainer.appendChild(col);
    });
}

/**
 * Update the quick market comparison section on home page
 * @param {string} vegetable - Selected vegetable
 */
function updateQuickMarketComparisonSection(vegetable) {
    const quickMarketContainer = document.getElementById('quick-market-container');
    if (!quickMarketContainer) return;
    
    // Clear existing content
    quickMarketContainer.innerHTML = '';
    
    // Get market data for the selected vegetable (in real implementation, this would come from an API)
    // For now, we'll calculate from our initial data
    const vegBasePrice = initialVegetableData[vegetable].current_price;
    
    // Calculate market prices based on factors
    const marketFactors = {
        "अपना बाजार मुंबई": 1.0,
        "पुणे बाजार": 0.95,
        "नागपूर बाजार": 0.85,
        "नाशिक बाजार": 0.8,
        "कोल्हापूर बाजार": 0.9
    };
    
    // Create a column for each market
    Object.entries(marketFactors).forEach(([market, factor]) => {
        const price = vegBasePrice * factor;
        
        const col = document.createElement('div');
        col.className = 'col-' + Math.floor(12 / Object.keys(marketFactors).length);
        
        const card = document.createElement('div');
        card.className = 'card text-center';
        
        card.innerHTML = `
            <div class="market-icon">${getMarketIcon(market)}</div>
            <h4 data-translate>${translate(market, currentLanguage)}</h4>
            <p class="price">₹ ${price.toFixed(2)}/kg</p>
        `;
        
        col.appendChild(card);
        quickMarketContainer.appendChild(col);
    });
}

/**
 * Update market comparison page data
 */
function updateMarketComparisonData() {
    const vegetableSelect = document.getElementById('comparison-vegetable-select');
    
    // Make sure we have a valid selection, using default if needed
    let selectedVegetable = getDefaultVegetable();
    
    if (vegetableSelect && vegetableSelect.value) {
        selectedVegetable = vegetableSelect.value;
    }
    
    // Update the market comparison chart
    updateMarketComparisonChart(selectedVegetable);
    
    // Update the market details table
    updateMarketDetailsTable(selectedVegetable);
}

/**
 * Update the market comparison chart
 * @param {string} vegetable - Selected vegetable
 */
function updateMarketComparisonChart(vegetable) {
    const chartContainer = document.getElementById('market-comparison-chart');
    if (!chartContainer) return;
    
    // Get market data for the selected vegetable (in real implementation, this would come from an API)
    const vegBasePrice = initialVegetableData[vegetable].current_price;
    
    // Calculate market prices based on factors
    const marketFactors = {
        "अपना बाजार मुंबई": 1.0,
        "पुणे बाजार": 0.95,
        "नागपूर बाजार": 0.85,
        "नाशिक बाजार": 0.8,
        "कोल्हापूर बाजार": 0.9
    };
    
    const marketPrices = {};
    Object.entries(marketFactors).forEach(([market, factor]) => {
        marketPrices[market] = vegBasePrice * factor;
    });
    
    // Create chart data
    const markets = Object.keys(marketPrices).map(market => translate(market, currentLanguage));
    const prices = Object.values(marketPrices);
    
    // Create the chart using Chart.js
    if (window.marketComparisonChart) {
        window.marketComparisonChart.destroy();
    }
    
    const ctx = chartContainer.getContext('2d');
    window.marketComparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: markets,
            datasets: [{
                label: `${translate(vegetable, currentLanguage)} ${translate('के मूल्य (रु./किलो)', currentLanguage)}`,
                data: prices,
                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: translate('किंमत (रु./किलो)', currentLanguage)
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: translate('बाजार', currentLanguage)
                    }
                }
            }
        }
    });
}

/**
 * Update the market details table
 * @param {string} vegetable - Selected vegetable
 */
function updateMarketDetailsTable(vegetable) {
    const tableContainer = document.getElementById('market-details-table');
    if (!tableContainer) return;
    
    // Get market data for the selected vegetable (in real implementation, this would come from an API)
    const vegBasePrice = initialVegetableData[vegetable].current_price;
    
    // Calculate market prices based on factors
    const marketFactors = {
        "अपना बाजार मुंबई": 1.0,
        "पुणे बाजार": 0.95,
        "नागपूर बाजार": 0.85,
        "नाशिक बाजार": 0.8,
        "कोल्हापूर बाजार": 0.9
    };
    
    // Create table headers
    let tableHtml = `
        <table>
            <thead>
                <tr>
                    <th data-translate>${translate('बाजार', currentLanguage)}</th>
                    <th data-translate>${translate('किंमत (रु./किलो)', currentLanguage)}</th>
                    <th data-translate>${translate('आज तुलनेत कालचे', currentLanguage)}</th>
                    <th data-translate>${translate('मागणी पातळी', currentLanguage)}</th>
                    <th data-translate>${translate('उपलब्धता', currentLanguage)}</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Generate random market details for demonstration
    // In a real implementation, this would come from the API
    const demandLevels = ["कमी", "मध्यम", "जास्त"];
    const availabilityLevels = ["मर्यादित", "मध्यम", "भरपूर"];
    
    // Add table rows for each market
    Object.entries(marketFactors).forEach(([market, factor]) => {
        const price = vegBasePrice * factor;
        const dayChange = (Math.random() * 6 - 3).toFixed(2); // Random value between -3 and 3
        const demandLevel = demandLevels[Math.floor(Math.random() * demandLevels.length)];
        const availability = availabilityLevels[Math.floor(Math.random() * availabilityLevels.length)];
        
        // Determine class for day change
        let dayChangeClass = '';
        if (parseFloat(dayChange) > 0) {
            dayChangeClass = 'price-increase';
        } else if (parseFloat(dayChange) < 0) {
            dayChangeClass = 'price-decrease';
        }
        
        tableHtml += `
            <tr>
                <td data-translate>${translate(market, currentLanguage)}</td>
                <td>₹ ${price.toFixed(2)}</td>
                <td class="${dayChangeClass}">${dayChange}</td>
                <td data-translate>${translate(demandLevel, currentLanguage)}</td>
                <td data-translate>${translate(availability, currentLanguage)}</td>
            </tr>
        `;
    });
    
    tableHtml += '</tbody></table>';
    tableContainer.innerHTML = tableHtml;
}

/**
 * Update price trends page data
 */
function updatePriceTrendsData() {
    const vegetableSelect = document.getElementById('trend-vegetable-select');
    const marketSelect = document.getElementById('trend-market-select');
    const timeframeSelect = document.getElementById('trend-timeframe-select');
    
    // Make sure we have valid selections, using defaults if needed
    let selectedVegetable = getDefaultVegetable();
    let selectedMarket = getDefaultMarket();
    let selectedTimeframe = "दैनिक"; // Default timeframe
    
    if (vegetableSelect && vegetableSelect.value) {
        selectedVegetable = vegetableSelect.value;
    }
    
    if (marketSelect && marketSelect.value) {
        selectedMarket = marketSelect.value;
    }
    
    if (timeframeSelect && timeframeSelect.value) {
        selectedTimeframe = timeframeSelect.value;
    }
    
    // Update price trend chart
    updatePriceTrendChart(selectedVegetable, selectedMarket, selectedTimeframe);
    
    // Update price statistics
    updatePriceStatistics(selectedVegetable, selectedMarket, selectedTimeframe);
}

/**
 * Update the price trend chart
 * @param {string} vegetable - Selected vegetable
 * @param {string} market - Selected market
 * @param {string} timeframe - Selected timeframe
 */
function updatePriceTrendChart(vegetable, market, timeframe) {
    const chartContainer = document.getElementById('price-trend-chart');
    if (!chartContainer) return;
    
    // Generate trend data based on parameters
    // In a real implementation, this would come from an API
    const trendData = generateTrendData(vegetable, market, timeframe);
    
    // Create chart using Chart.js
    if (window.priceTrendChart) {
        window.priceTrendChart.destroy();
    }
    
    const ctx = chartContainer.getContext('2d');
    window.priceTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: trendData.dates,
            datasets: [{
                label: translate('ऐतिहासिक', currentLanguage),
                data: trendData.prices,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }, {
                label: translate('अंदाज', currentLanguage),
                data: trendData.forecastPrices,
                borderColor: '#FF9800',
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: translate('किंमत (रु./किलो)', currentLanguage)
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: translate('तारीख', currentLanguage)
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `${translate(vegetable, currentLanguage)} ${translate('मूल्य प्रवृत्ती', currentLanguage)} - ${translate(market, currentLanguage)}`
                }
            }
        }
    });
}

/**
 * Generate trend data for a vegetable
 * @param {string} vegetable - Selected vegetable
 * @param {string} market - Selected market
 * @param {string} timeframe - Selected timeframe
 * @returns {Object} - Trend data with dates and prices
 */
function generateTrendData(vegetable, market, timeframe) {
    // Base price from initial data
    const vegData = initialVegetableData[vegetable];
    const marketFactors = {
        "अपना बाजार मुंबई": 1.0,
        "पुणे बाजार": 0.95,
        "नागपूर बाजार": 0.85,
        "नाशिक बाजार": 0.8,
        "कोल्हापूर बाजार": 0.9
    };
    
    const marketFactor = marketFactors[market] || 1.0;
    const basePrice = vegData.current_price * marketFactor;
    
    // Number of data points and interval based on timeframe
    let days, interval;
    if (timeframe === "दैनिक") {
        days = 7;
        interval = 1;
    } else if (timeframe === "साप्ताहिक") {
        days = 4 * 7; // 4 weeks
        interval = 7;
    } else { // Monthly
        days = 6 * 30; // 6 months
        interval = 30;
    }
    
    // Generate dates and prices
    const dates = [];
    const prices = [];
    
    // Add some realistic variation
    const trendDirection = (Math.random() * 0.4 - 0.2); // -0.2 to 0.2
    const volatility = 0.03 + Math.random() * 0.05; // 0.03 to 0.08
    
    const now = new Date();
    
    for (let i = days; i >= 0; i -= interval) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString('en-IN'));
        
        // Calculate price with trend, seasonality, and noise
        const daysAgo = i;
        const trendFactor = 1 + (trendDirection * daysAgo / days);
        const seasonalFactor = 1 + 0.1 * Math.sin(daysAgo / 30 * Math.PI); // Monthly seasonality
        const noiseFactor = 1 + (Math.random() * 2 - 1) * volatility;
        
        const price = basePrice * trendFactor * seasonalFactor * noiseFactor;
        prices.push(price.toFixed(2));
    }
    
    // Generate forecast prices for next 7 days
    const forecastDates = [];
    const forecastPrices = [];
    
    // Linear extrapolation for forecast
    const pricesNum = prices.map(p => parseFloat(p));
    const lastPrice = pricesNum[pricesNum.length - 1];
    const secondLastPrice = pricesNum[pricesNum.length - 2];
    const priceChange = lastPrice - secondLastPrice;
    
    // Fill with null values for historical dates
    for (let i = 0; i < dates.length; i++) {
        forecastPrices.push(null);
    }
    
    // Add forecast dates and prices
    for (let i = 1; i <= 7; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i);
        dates.push(date.toLocaleDateString('en-IN'));
        
        const forecastedPrice = lastPrice + priceChange * i * (1 + (Math.random() * 0.4 - 0.2));
        forecastPrices.push(forecastedPrice.toFixed(2));
    }
    
    return {
        dates,
        prices: pricesNum,
        forecastPrices
    };
}

/**
 * Update price statistics cards
 * @param {string} vegetable - Selected vegetable
 * @param {string} market - Selected market
 * @param {string} timeframe - Selected timeframe
 */
function updatePriceStatistics(vegetable, market, timeframe) {
    const trendData = generateTrendData(vegetable, market, timeframe);
    const prices = trendData.prices;
    
    // Calculate statistics
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const netChange = lastPrice - firstPrice;
    const pctChange = (netChange / firstPrice) * 100;
    
    // Update the UI
    const avgPriceElement = document.getElementById('avg-price');
    const maxPriceElement = document.getElementById('max-price');
    const minPriceElement = document.getElementById('min-price');
    const netChangeElement = document.getElementById('net-change');
    const pctChangeElement = document.getElementById('pct-change');
    
    if (avgPriceElement) avgPriceElement.textContent = `₹ ${avgPrice.toFixed(2)}`;
    if (maxPriceElement) maxPriceElement.textContent = `₹ ${maxPrice.toFixed(2)}`;
    if (minPriceElement) minPriceElement.textContent = `₹ ${minPrice.toFixed(2)}`;
    if (netChangeElement) netChangeElement.textContent = `₹ ${netChange.toFixed(2)}`;
    
    if (pctChangeElement) {
        if (pctChange > 0) {
            pctChangeElement.textContent = `+${pctChange.toFixed(1)}%`;
            pctChangeElement.className = 'price-increase';
        } else if (pctChange < 0) {
            pctChangeElement.textContent = `${pctChange.toFixed(1)}%`;
            pctChangeElement.className = 'price-decrease';
        } else {
            pctChangeElement.textContent = `${pctChange.toFixed(1)}%`;
            pctChangeElement.className = 'price-stable';
        }
    }
}

/**
 * Update demand-supply page data
 */
function updateDemandSupplyData() {
    const vegetableSelect = document.getElementById('demand-vegetable-select');
    
    // Make sure we have a valid selection, using default if needed
    let selectedVegetable = getDefaultVegetable();
    
    if (vegetableSelect && vegetableSelect.value) {
        selectedVegetable = vegetableSelect.value;
    }
    
    // Update demand-supply gauge
    updateDemandSupplyGauge(selectedVegetable);
    
    // Update market state
    updateMarketState(selectedVegetable);
    
    // Update regional supply table
    updateRegionalSupplyTable(selectedVegetable);
    
    // Update supply forecast chart
    updateSupplyForecastChart(selectedVegetable);
}

/**
 * Update the demand-supply gauge
 * @param {string} vegetable - Selected vegetable
 */
function updateDemandSupplyGauge(vegetable) {
    const gaugeContainer = document.getElementById('demand-supply-gauge');
    if (!gaugeContainer) return;
    
    // In a real implementation, this would come from an API
    // Generate random indices for demonstration
    const demandIndex = (3 + Math.random() * 5).toFixed(1); // 3.0 to 8.0
    const supplyIndex = (2 + Math.random() * 7).toFixed(1); // 2.0 to 9.0
    
    // Update the gauge chart using Chart.js
    if (window.demandSupplyGaugeChart) {
        window.demandSupplyGaugeChart.destroy();
    }
    
    // Create gauge using Chart.js
    const ctx = gaugeContainer.getContext('2d');
    window.demandSupplyGaugeChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                translate('मागणी निर्देशांक', currentLanguage),
                translate('पुरवठा निर्देशांक', currentLanguage)
            ],
            datasets: [{
                label: translate(vegetable, currentLanguage),
                data: [demandIndex, supplyIndex],
                backgroundColor: 'rgba(255, 152, 0, 0.2)',
                borderColor: 'rgba(255, 152, 0, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 152, 0, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    min: 0,
                    max: 10,
                    ticks: {
                        stepSize: 2
                    }
                }
            }
        }
    });
    
    // Update the indices display
    const demandIndexElement = document.getElementById('demand-index');
    const supplyIndexElement = document.getElementById('supply-index');
    
    if (demandIndexElement) demandIndexElement.textContent = demandIndex;
    if (supplyIndexElement) supplyIndexElement.textContent = supplyIndex;
    
    // Return the indices for use by other functions
    return { demandIndex, supplyIndex };
}

/**
 * Update the market state section
 * @param {string} vegetable - Selected vegetable
 */
function updateMarketState(vegetable) {
    const marketStateContainer = document.getElementById('market-state-container');
    if (!marketStateContainer) return;
    
    // Get indices from gauge function
    const { demandIndex, supplyIndex } = updateDemandSupplyGauge(vegetable);
    
    // Determine market state
    let marketState, marketStateClass, priceTrend, priceTrendPercent;
    
    if (parseFloat(supplyIndex) > parseFloat(demandIndex) + 2) {
        marketState = "पुरवठा अधिक";
        marketStateClass = "surplus";
        priceTrend = "कमी होण्याची शक्यता";
        priceTrendPercent = 5 + Math.floor(Math.random() * 10); // 5% to 15%
    } else if (parseFloat(demandIndex) > parseFloat(supplyIndex) + 2) {
        marketState = "पुरवठा कमी";
        marketStateClass = "shortage";
        priceTrend = "वाढण्याची शक्यता";
        priceTrendPercent = 8 + Math.floor(Math.random() * 12); // 8% to 20%
    } else {
        marketState = "संतुलित बाजारपेठ";
        marketStateClass = "balanced";
        priceTrend = "स्थिर राहण्याची शक्यता";
        priceTrendPercent = 2 + Math.floor(Math.random() * 3); // 2% to 5%
    }
    
    // Generate analysis text based on market state
    const analysisTemplates = {
        "पुरवठा अधिक": `वर्तमान बाजारपेठेत ${vegetable} चा पुरवठा मागणीपेक्षा जास्त आहे. शेतकऱ्यांनी विक्रीसाठी आणण्यापूर्वी किंमती स्थिर होण्याची वाट पाहावी. किंवा स्टोरेज क्षमता वापरावी.`,
        "पुरवठा कमी": `सध्या ${vegetable} ची मागणी पुरवठ्यापेक्षा जास्त आहे. शेतकऱ्यांनी तात्काळ विक्री करण्याचा विचार करावा कारण किंमती वाढत आहेत.`,
        "संतुलित बाजारपेठ": `${vegetable} साठी बाजारपेठ सध्या संतुलित आहे, मागणी आणि पुरवठा समान आहेत. नजीकच्या काळात किंमतीत मोठे बदल अपेक्षित नाहीत.`
    };
    
    const analysis = analysisTemplates[marketState];
    
    // Update the UI
    marketStateContainer.innerHTML = `
        <div class="market-state ${marketStateClass}">
            <h3 data-translate>${translate(marketState, currentLanguage)}</h3>
            <p>
                <span data-translate>${translate('किंमत', currentLanguage)}:</span> 
                <strong data-translate>${translate(priceTrend, currentLanguage)} (${priceTrendPercent}%)</strong>
            </p>
        </div>
        <div class="card">
            <h3 data-translate>${translate('बाजारपेठ विश्लेषण', currentLanguage)}</h3>
            <p>${translate(analysis, currentLanguage)}</p>
        </div>
    `;
}

/**
 * Update the regional supply table
 * @param {string} vegetable - Selected vegetable
 */
function updateRegionalSupplyTable(vegetable) {
    const regionalTableContainer = document.getElementById('regional-supply-table');
    if (!regionalTableContainer) return;
    
    // In a real implementation, this would come from an API
    // Generate regional data for demonstration
    const regions = ["पश्चिम महाराष्ट्र", "विदर्भ", "मराठवाडा", "कोकण", "उत्तर महाराष्ट्र"];
    const arrivalLevels = ["कमी", "मध्यम", "जास्त"];
    
    let tableHtml = `
        <table>
            <thead>
                <tr>
                    <th data-translate>${translate('प्रदेश', currentLanguage)}</th>
                    <th data-translate>${translate('उत्पादन (मेट्रिक टन)', currentLanguage)}</th>
                    <th data-translate>${translate('प्रति हेक्टर उत्पादन', currentLanguage)}</th>
                    <th data-translate>${translate('बाजारपेठेत आवक', currentLanguage)}</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Add a row for each region
    regions.forEach(region => {
        const production = 100 + Math.floor(Math.random() * 900); // 100 to 1000
        const yield_per_hectare = (5 + Math.random() * 10).toFixed(2); // 5.00 to 15.00
        const arrival = arrivalLevels[Math.floor(Math.random() * arrivalLevels.length)];
        
        tableHtml += `
            <tr>
                <td data-translate>${translate(region, currentLanguage)}</td>
                <td>${production}</td>
                <td>${yield_per_hectare}</td>
                <td data-translate>${translate(arrival, currentLanguage)}</td>
            </tr>
        `;
    });
    
    tableHtml += '</tbody></table>';
    regionalTableContainer.innerHTML = tableHtml;
}

/**
 * Update the supply forecast chart
 * @param {string} vegetable - Selected vegetable
 */
function updateSupplyForecastChart(vegetable) {
    const forecastChartContainer = document.getElementById('supply-forecast-chart');
    if (!forecastChartContainer) return;
    
    // In a real implementation, this would come from an API
    // Generate forecast data for demonstration
    const daysAhead = [1, 2, 3, 4, 5, 6, 7];
    const currentSupply = 300 + Math.floor(Math.random() * 500); // 300 to 800
    const dailyChange = (Math.random() * 0.2 - 0.1); // -0.1 to 0.1
    
    const forecastData = daysAhead.map(day => {
        const forecast = currentSupply * (1 + dailyChange * day);
        return Math.floor(forecast);
    });
    
    // Create labels for next 7 days
    const labels = [];
    const now = new Date();
    
    for (let i = 1; i <= 7; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i);
        labels.push(date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }));
    }
    
    // Create forecast chart using Chart.js
    if (window.supplyForecastChart) {
        window.supplyForecastChart.destroy();
    }
    
    const ctx = forecastChartContainer.getContext('2d');
    window.supplyForecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: translate('अंदाजित पुरवठा (मेट्रिक टन)', currentLanguage),
                data: forecastData,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: translate('पुरवठा (मेट्रिक टन)', currentLanguage)
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: translate('तारीख', currentLanguage)
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: translate('पुढील 7 दिवसांसाठी पुरवठा अंदाज', currentLanguage)
                }
            }
        }
    });
}