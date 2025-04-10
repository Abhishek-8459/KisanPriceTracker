// Translation functionality for Krushi Pravah

// Dictionary of translations
const TRANSLATIONS = {
    // General UI elements
    "कृषी प्रवाह": { "english": "Krushi Pravah", "marathi": "कृषी प्रवाह" },
    "किसान मूल्य विश्लेषक": { "english": "Farmer Price Analyzer", "marathi": "किसान मूल्य विश्लेषक" },
    "महाराष्ट्र भाजीपाला मूल्य विश्लेषक": { "english": "Maharashtra Vegetable Price Analyzer", "marathi": "महाराष्ट्र भाजीपाला मूल्य विश्लेषक" },
    "मेनू": { "english": "Menu", "marathi": "मेनू" },
    "पृष्ठ निवडा": { "english": "Select Page", "marathi": "पृष्ठ निवडा" },
    "मुख्यपृष्ठ": { "english": "Home", "marathi": "मुख्यपृष्ठ" },
    "बाजार तुलना": { "english": "Market Comparison", "marathi": "बाजार तुलना" },
    "मूल्य प्रवृत्ती": { "english": "Price Trends", "marathi": "मूल्य प्रवृत्ती" },
    "मागणी आणि पुरवठा": { "english": "Demand and Supply", "marathi": "मागणी आणि पुरवठा" },
    "अंतिम अद्यतनित": { "english": "Last Updated", "marathi": "अंतिम अद्यतनित" },
    "डेटा स्त्रोत": { "english": "Data Source", "marathi": "डेटा स्त्रोत" },
    "पुणे APMC वेबसाइट": { "english": "Pune APMC Website", "marathi": "पुणे APMC वेबसाइट" },
    
    // Home page
    "आजचे बाजारभाव": { "english": "Today's Market Prices", "marathi": "आजचे बाजारभाव" },
    "बाजार निवडा": { "english": "Select Market", "marathi": "बाजार निवडा" },
    "भाजी निवडा": { "english": "Select Vegetable", "marathi": "भाजी निवडा" },
    "वर्तमान किंमत": { "english": "Current Price", "marathi": "वर्तमान किंमत" },
    "गेल्या आठवड्यापासून": { "english": "from last week", "marathi": "गेल्या आठवड्यापासून" },
    "कोणताही बदल नाही": { "english": "No change", "marathi": "कोणताही बदल नाही" },
    "आजचे सर्वोत्तम भाज्या": { "english": "Today's Top Vegetables", "marathi": "आजचे सर्वोत्तम भाज्या" },
    
    // Market comparison page
    "बाजार तपशील": { "english": "Market Details", "marathi": "बाजार तपशील" },
    "बाजार": { "english": "Market", "marathi": "बाजार" },
    "किंमत (रु./किलो)": { "english": "Price (Rs./kg)", "marathi": "किंमत (रु./किलो)" },
    "आज तुलनेत कालचे": { "english": "Today vs Yesterday", "marathi": "आज तुलनेत कालचे" },
    "मागणी पातळी": { "english": "Demand Level", "marathi": "मागणी पातळी" },
    "उपलब्धता": { "english": "Availability", "marathi": "उपलब्धता" },
    
    // Price trend page
    "कालावधी निवडा": { "english": "Select Timeframe", "marathi": "कालावधी निवडा" },
    "दैनिक": { "english": "Daily", "marathi": "दैनिक" },
    "साप्ताहिक": { "english": "Weekly", "marathi": "साप्ताहिक" },
    "मासिक": { "english": "Monthly", "marathi": "मासिक" },
    "मूल्य आकडेवारी": { "english": "Price Statistics", "marathi": "मूल्य आकडेवारी" },
    "सरासरी किंमत": { "english": "Average Price", "marathi": "सरासरी किंमत" },
    "सर्वाधिक किंमत": { "english": "Maximum Price", "marathi": "सर्वाधिक किंमत" },
    "किमान किंमत": { "english": "Minimum Price", "marathi": "किमान किंमत" },
    "शुद्ध बदल": { "english": "Net Change", "marathi": "शुद्ध बदल" },
    "मूल्य अंदाज": { "english": "Price Forecast", "marathi": "मूल्य अंदाज" },
    "के मूल्य (रु./किलो)": { "english": "Prices (Rs./kg)", "marathi": "के मूल्य (रु./किलो)" },
    "तारीख": { "english": "Date", "marathi": "तारीख" },
    "(साध्या प्रवृत्ती विश्लेषणावर आधारित)": { "english": "(Based on simple trend analysis)", "marathi": "(साध्या प्रवृत्ती विश्लेषणावर आधारित)" },
    "मूल्य प्रवृत्ती आणि अंदाज": { "english": "Price Trend and Forecast", "marathi": "मूल्य प्रवृत्ती आणि अंदाज" },
    "ऐतिहासिक": { "english": "Historical", "marathi": "ऐतिहासिक" },
    "अंदाज": { "english": "Forecast", "marathi": "अंदाज" },
    "अंदाजित किंमत": { "english": "Forecasted Price", "marathi": "अंदाजित किंमत" },
    "पुरेशी डेटा उपलब्ध नाही अंदाज काढण्यासाठी": { "english": "Insufficient data available for forecasting", "marathi": "पुरेशी डेटा उपलब्ध नाही अंदाज काढण्यासाठी" },
    
    // Demand and supply page
    "वर्तमान मागणी-पुरवठा संतुलन": { "english": "Current Demand-Supply Balance", "marathi": "वर्तमान मागणी-पुरवठा संतुलन" },
    "मागणी निर्देशांक": { "english": "Demand Index", "marathi": "मागणी निर्देशांक" },
    "पुरवठा निर्देशांक": { "english": "Supply Index", "marathi": "पुरवठा निर्देशांक" },
    "बाजारपेठ विश्लेषण": { "english": "Market Analysis", "marathi": "बाजारपेठ विश्लेषण" },
    "वाढण्याची शक्यता": { "english": "Likely to increase", "marathi": "वाढण्याची शक्यता" },
    "कमी होण्याची शक्यता": { "english": "Likely to decrease", "marathi": "कमी होण्याची शक्यता" },
    "स्थिर राहण्याची शक्यता": { "english": "Likely to remain stable", "marathi": "स्थिर राहण्याची शक्यता" },
    "पुरवठा अधिक": { "english": "Supply Surplus", "marathi": "पुरवठा अधिक" },
    "पुरवठा कमी": { "english": "Supply Shortage", "marathi": "पुरवठा कमी" },
    "संतुलित बाजारपेठ": { "english": "Balanced Market", "marathi": "संतुलित बाजारपेठ" },
    "प्रादेशिक पुरवठा": { "english": "Regional Supply", "marathi": "प्रादेशिक पुरवठा" },
    "प्रदेश": { "english": "Region", "marathi": "प्रदेश" },
    "उत्पादन (मेट्रिक टन)": { "english": "Production (MT)", "marathi": "उत्पादन (मेट्रिक टन)" },
    "प्रति हेक्टर उत्पादन": { "english": "Yield per Hectare", "marathi": "प्रति हेक्टर उत्पादन" },
    "बाजारपेठेत आवक": { "english": "Market Arrivals", "marathi": "बाजारपेठेत आवक" },
    "पुढील 7 दिवसांसाठी पुरवठा अंदाज": { "english": "Supply Forecast for Next 7 Days", "marathi": "पुढील 7 दिवसांसाठी पुरवठा अंदाज" },
    "पुरवठा अंदाज (मेट्रिक टन)": { "english": "Supply Forecast (MT)", "marathi": "पुरवठा अंदाज (मेट्रिक टन)" },
    "अंदाजित पुरवठा (मेट्रिक टन)": { "english": "Estimated Supply (MT)", "marathi": "अंदाजित पुरवठा (मेट्रिक टन)" },
    
    // Demand and supply levels
    "कमी": { "english": "Low", "marathi": "कमी" },
    "मध्यम": { "english": "Medium", "marathi": "मध्यम" },
    "जास्त": { "english": "High", "marathi": "जास्त" },
    "मर्यादित": { "english": "Limited", "marathi": "मर्यादित" },
    "भरपूर": { "english": "Abundant", "marathi": "भरपूर" },
    
    // Vegetables
    "टोमॅटो": { "english": "Tomato", "marathi": "टोमॅटो" },
    "कांदा": { "english": "Onion", "marathi": "कांदा" },
    "बटाटा": { "english": "Potato", "marathi": "बटाटा" },
    "वांगे": { "english": "Eggplant", "marathi": "वांगे" },
    "कोबी": { "english": "Cabbage", "marathi": "कोबी" },
    "फ्लॉवर": { "english": "Cauliflower", "marathi": "फ्लॉवर" },
    "भेंडी": { "english": "Ladyfinger", "marathi": "भेंडी" },
    "गाजर": { "english": "Carrot", "marathi": "गाजर" },
    
    // Markets
    "अपना बाजार मुंबई": { "english": "Apna Bazar Mumbai", "marathi": "अपना बाजार मुंबई" },
    "पुणे बाजार": { "english": "Pune Market", "marathi": "पुणे बाजार" },
    "नागपूर बाजार": { "english": "Nagpur Market", "marathi": "नागपूर बाजार" },
    "नाशिक बाजार": { "english": "Nashik Market", "marathi": "नाशिक बाजार" },
    "कोल्हापूर बाजार": { "english": "Kolhapur Market", "marathi": "कोल्हापूर बाजार" }
};

/**
 * Translate text to the target language
 * @param {string} text - Text to translate
 * @param {string} targetLanguage - Target language (english or marathi)
 * @returns {string} - Translated text
 */
function translate(text, targetLanguage) {
    if (targetLanguage.toLowerCase() === "marathi") {
        return text; // Already in Marathi
    }
    
    if (TRANSLATIONS[text]) {
        return TRANSLATIONS[text]["english"];
    }
    
    // Fallback if translation not found
    return text;
}

/**
 * Update all translatable elements on the page
 * @param {string} language - Target language (english or marathi)
 */
function updatePageLanguage(language) {
    // Update all elements with data-translate attribute
    const translatableElements = document.querySelectorAll('[data-translate]');
    
    translatableElements.forEach(element => {
        // If data-translate has a value, use it, otherwise use the element's content
        const originalText = element.getAttribute('data-translate') || element.textContent;
        if (originalText && originalText.trim() !== '') {
            element.textContent = translate(originalText, language);
        }
    });
    
    // Update all option elements in selects
    const selectElements = document.querySelectorAll('select');
    
    selectElements.forEach(select => {
        Array.from(select.options).forEach(option => {
            const originalText = option.getAttribute('data-translate-value') || option.textContent;
            if (originalText && originalText.trim() !== '') {
                option.textContent = translate(originalText, language);
            }
        });
    });
    
    // Update language toggle button
    const languageButton = document.getElementById('language-toggle');
    if (languageButton) {
        if (language.toLowerCase() === "marathi") {
            languageButton.textContent = "Switch to English";
        } else {
            languageButton.textContent = "मराठीमध्ये बदला";
        }
    }
}

/**
 * Get vegetable icon SVG for the given vegetable
 * @param {string} vegetableName - Name of the vegetable
 * @returns {string} - SVG HTML for the vegetable icon
 */
function getVegetableIcon(vegetableName) {
    const icons = {
        "टोमॅटो": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#e53935"><path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M7,9c0-2.76,2.24-5,5-5s5,2.24,5,5 c0,0.88-0.36,1.86-1,2.88C14.92,13.52,13,15.44,12,16.61c-1-1.17-2.92-3.09-4-4.73C7.36,10.86,7,9.88,7,9z"/></svg>',
        "कांदा": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#9C27B0"><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.42,0-8-3.58-8-8c0-4.42,3.58-8,8-8 s8,3.58,8,8C20,16.42,16.42,20,12,20z"/></svg>',
        "बटाटा": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#795548"><path d="M14.06,9.02l0.92,0.92L5.92,19H5v-0.92L14.06,9.02 M17.66,3c-0.25,0-0.51,0.1-0.7,0.29l-1.83,1.83l3.75,3.75l1.83-1.83 c0.39-0.39,0.39-1.02,0-1.41l-2.34-2.34C18.17,3.09,17.92,3,17.66,3L17.66,3z M14.06,6.19L3,17.25V21h3.75L17.81,9.94 L14.06,6.19L14.06,6.19z"/></svg>',
        "वांगे": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#5E35B1"><path d="M17,12c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S19.76,12,17,12z M17,20c-1.65,0-3-1.35-3-3s1.35-3,3-3s3,1.35,3,3 S18.65,20,17,20z"/></svg>',
        "कोबी": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#4CAF50"><path d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/></svg>',
        "फ्लॉवर": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#FFEB3B"><path d="M18.7,12.4c-0.28-0.16-0.57-0.29-0.86-0.4C18.4,10.19,17.5,8.4,16,7.28c0.28-0.24,0.5-0.56,0.65-0.92 c0.21-0.49,0.21-1.04,0-1.53c-0.16-0.36-0.43-0.64-0.8-0.8c-0.32-0.14-0.65-0.17-0.97-0.07c0.05-0.4,0-0.83-0.17-1.21 C14.29,1.71,13.31,1,12.22,1C11.4,1,10.63,1.38,10.14,2.02C8.58,1.74,6.97,2.07,5.68,2.9C4.16,3.86,3.1,5.34,2.74,7.04 c-0.13,0.62-0.19,1.24-0.18,1.85c-0.17-0.02-0.34,0-0.52,0.04c-0.52,0.13-0.97,0.5-1.19,0.98C0.5,10.63,0.5,11.5,1,12.22 c0.33,0.48,0.8,0.75,1.34,0.76c-1.06,1.47-1.19,3.49-0.39,5.06c0.77,1.51,2.31,2.63,3.98,2.9c0.19,0.03,0.37,0.05,0.55,0.05 c1.1,0,2.13-0.43,2.9-1.18c0,0,0,0.01,0,0.01c0,1.02,0.83,1.85,1.85,1.85c0.98,0,1.77-0.77,1.82-1.75c0.39,0.5,0.96,0.81,1.6,0.83 c0.69,0.02,1.36-0.3,1.78-0.85c0.5-0.67,0.6-1.63,0.25-2.42l-0.04-0.1c2.01-0.35,3.76-1.66,4.74-3.54c0.24-0.47,0.41-0.93,0.5-1.41 C21.72,10.96,20.33,13.33,18.7,12.4z"/></svg>',
        "भेंडी": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#66BB6A"><path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M15.61,8.34c1.07,0,1.93,0.86,1.93,1.93 s-0.86,1.93-1.93,1.93c-1.07,0-1.93-0.86-1.93-1.93C13.68,9.2,14.54,8.34,15.61,8.34z M8.39,8.34c1.07,0,1.93,0.86,1.93,1.93 s-0.86,1.93-1.93,1.93c-1.07,0-1.93-0.86-1.93-1.93C6.46,9.2,7.32,8.34,8.39,8.34z M12,18.93c-3.04,0-5.58-2.16-6.17-5.03 C7.71,14.6,9.76,15,12,15s4.29-0.4,6.17-1.1C17.58,16.77,15.04,18.93,12,18.93z"/></svg>',
        "गाजर": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#FF7043"><path d="M4.5,9.5C5.33,8.67,7,8.67,7,8.67s0-1.67-0.83-2.5C5.33,5.33,3.67,5.33,2.83,6.17S2,8.67,2,8.67S3.67,10.33,4.5,9.5z M10.5,15.5c0.83-0.83,0.83-2.5,0.83-2.5s1.67,0,2.5-0.83c0.83-0.83,0.83-2.5,0-3.33s-2.5-0.83-2.5-0.83s0-1.67-0.83-2.5 S8,4.67,7.17,5.5S6.33,8,6.33,8s-1.67,0-2.5,0.83S2.17,11.33,3,12.17s2.5,0.83,2.5,0.83s0,1.67,0.83,2.5s2.5,0.83,3.33,0 C10.5,15.5,10.5,15.5,10.5,15.5z M16.17,10C15.5,10.67,14.33,11,13.67,10.33S13,8.5,13.67,7.83s2.5-0.83,3.17-0.17 S16.83,9.33,16.17,10z M20.83,6.5C20.33,7,19.5,7.33,19,6.83S18.5,5.5,19,5s2-0.5,2.5,0S21.33,6,20.83,6.5z"/></svg>'
    };
    
    return icons[vegetableName] || '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#4CAF50"><circle cx="12" cy="12" r="8"/></svg>';
}

/**
 * Get market icon SVG for the given market
 * @param {string} marketName - Name of the market
 * @returns {string} - SVG HTML for the market icon
 */
function getMarketIcon(marketName) {
    const icons = {
        "अपना बाजार मुंबई": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#2196F3"><path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5 s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z"/></svg>',
        "पुणे बाजार": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#4CAF50"><path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5 s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z"/></svg>',
        "नागपूर बाजार": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#FF9800"><path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5 s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z"/></svg>',
        "नाशिक बाजार": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#9C27B0"><path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5 s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z"/></svg>',
        "कोल्हापूर बाजार": '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#F44336"><path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5 s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z"/></svg>'
    };
    
    return icons[marketName] || '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#757575"><path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5 s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z"/></svg>';
}

/**
 * Format price with Indian currency symbol
 * @param {number} price - Price to format
 * @returns {string} - Formatted price
 */
function formatPrice(price) {
    return `₹ ${price.toFixed(2)}`;
}