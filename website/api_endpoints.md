# Krushi Pravah API Endpoints Documentation

This document outlines the API endpoints required for the frontend to interact with your backend implementation.

## Base URL

All endpoints should be prefixed with: `/api`

## Endpoints

### 1. Get Vegetable Data

Retrieves price data for vegetables.

- **URL**: `/vegetable-data`
- **Method**: `GET`
- **URL Parameters**:
  - `vegetable` (optional): Name of the specific vegetable to get data for
  - `market`: Name of the market to get data for (default: "अपना बाजार मुंबई")
- **Response Example**:
  ```json
  // If vegetable parameter is provided:
  {
    "current_price": 40.50,
    "price_change": 5.25,
    "arrival": 1200
  }
  
  // If vegetable parameter is not provided (returns data for all vegetables):
  {
    "टोमॅटो": {"current_price": 40.50, "price_change": 5.25, "arrival": 1200},
    "कांदा": {"current_price": 30.25, "price_change": -3.0, "arrival": 1500},
    "बटाटा": {"current_price": 25.0, "price_change": 0, "arrival": 1800},
    ...
  }
  ```

### 2. Get Market Data

Retrieves price data for a vegetable across different markets.

- **URL**: `/market-data`
- **Method**: `GET`
- **URL Parameters**:
  - `vegetable`: Name of the vegetable to get market data for (default: "टोमॅटो")
  - `market` (optional): Specific market to get detailed data for 
  - `details`: Whether to return detailed market information (default: false)
- **Response Example**:
  ```json
  // If market parameter is not provided:
  {
    "अपना बाजार मुंबई": 40.50,
    "पुणे बाजार": 38.48,
    "नागपूर बाजार": 34.43,
    "नाशिक बाजार": 32.40,
    "कोल्हापूर बाजार": 36.45
  }
  
  // If market parameter is provided and details=true:
  {
    "price": 38.48,
    "day_change": 2.5,
    "demand_level": "मध्यम",
    "availability": "भरपूर"
  }
  ```

### 3. Get Trend Data

Retrieves historical price trend data for a vegetable in a specific market.

- **URL**: `/trend-data`
- **Method**: `GET`
- **URL Parameters**:
  - `vegetable`: Name of the vegetable to get trend data for
  - `market`: Name of the market to get trend data for
  - `timeframe`: Timeframe ("दैनिक", "साप्ताहिक", "मासिक")
- **Response Example**:
  ```json
  [
    {
      "date": "2025-04-01",
      "price": 38.50
    },
    {
      "date": "2025-04-02",
      "price": 39.25
    },
    ...
  ]
  ```

### 4. Get Demand-Supply Data

Retrieves demand and supply data for a specific vegetable.

- **URL**: `/demand-supply-data`
- **Method**: `GET`
- **URL Parameters**:
  - `vegetable`: Name of the vegetable to get demand-supply data for
- **Response Example**:
  ```json
  {
    "demand_index": 7.2,
    "supply_index": 5.3,
    "market_state": "shortage",
    "price_prediction": {
      "trend": "increase",
      "percent": 15
    },
    "analysis": "सध्या टोमॅटो ची मागणी पुरवठ्यापेक्षा जास्त आहे. शेतकऱ्यांनी तात्काळ विक्री करण्याचा विचार करावा कारण किंमती वाढत आहेत.",
    "regional_supply": [
      {
        "प्रदेश": "पश्चिम महाराष्ट्र",
        "उत्पादन (मेट्रिक टन)": 850,
        "प्रति हेक्टर उत्पादन": 12.5,
        "बाजारपेठेत आवक": "मध्यम"
      },
      ...
    ],
    "supply_forecast": [450, 465, 480, 495, 510, 525, 540]
  }
  ```

### 5. Get Current Date

Retrieves the current date from the system or from the APMC website.

- **URL**: `/current-date`
- **Method**: `GET`
- **Response Example**:
  ```json
  {
    "date": "10-04-2025"
  }
  ```

## Implementation Notes

1. The backend should connect to real data sources like the Pune APMC website when possible
2. Include proper error handling and return appropriate HTTP status codes
3. Implement caching for API responses to reduce load on external data sources
4. Make sure to handle data transformation for different languages based on a language parameter if needed

## Example Backend Structure

Your backend implementation could use the same techniques from the existing web_scraper.py to fetch real data. Here's a suggested structure:

```
backend/
  ├── app.py              # Main application file
  ├── routes/             # API route handlers
  │   ├── vegetable.py    
  │   ├── market.py       
  │   ├── trend.py        
  │   └── demand.py       
  ├── services/           # Business logic
  │   ├── scraper.py      # Web scraping functions
  │   ├── data_processor.py
  │   └── cache.py        # Cache functionality
  └── models/             # Data models
      └── api_models.py   # Response data structures
```