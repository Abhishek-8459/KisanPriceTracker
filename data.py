import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# We'll use deterministic random but with fixed seeds for consistency
# Normally this would connect to a real API for live data

def get_vegetable_data(vegetable=None, market="अपना बाजार मुंबई"):
    """
    Get current price data for vegetables.
    If vegetable is None, returns data for all vegetables.
    """
    # Set seed for deterministic "random" data
    random.seed(hash(f"{vegetable}{market}{datetime.now().strftime('%Y-%m-%d')}"))
    
    # Base data for major vegetables (realistic prices in ₹/kg)
    vegetable_data = {
        "टोमॅटो": {"current_price": 40 + random.randint(-5, 10), "price_change": random.randint(-8, 8)},
        "कांदा": {"current_price": 30 + random.randint(-3, 8), "price_change": random.randint(-5, 5)},
        "बटाटा": {"current_price": 25 + random.randint(-2, 5), "price_change": random.randint(-3, 3)},
        "वांगे": {"current_price": 35 + random.randint(-5, 8), "price_change": random.randint(-6, 6)},
        "कोबी": {"current_price": 20 + random.randint(-3, 5), "price_change": random.randint(-4, 4)},
        "फ्लॉवर": {"current_price": 45 + random.randint(-5, 10), "price_change": random.randint(-7, 7)},
        "भेंडी": {"current_price": 60 + random.randint(-10, 15), "price_change": random.randint(-8, 8)},
        "गाजर": {"current_price": 35 + random.randint(-5, 8), "price_change": random.randint(-5, 5)}
    }
    
    # Market price variation factors (Mumbai as baseline)
    market_factors = {
        "अपना बाजार मुंबई": 1.0,
        "पुणे बाजार": 0.95,
        "नागपूर बाजार": 0.85,
        "नाशिक बाजार": 0.8,
        "कोल्हापूर बाजार": 0.9
    }
    
    # Apply market variation
    factor = market_factors.get(market, 1.0)
    for veg in vegetable_data:
        vegetable_data[veg]["current_price"] = round(vegetable_data[veg]["current_price"] * factor, 2)
    
    # Return data for single vegetable if specified
    if vegetable:
        return vegetable_data.get(vegetable, {"current_price": 0, "price_change": 0})
    
    # Otherwise, return all data
    return vegetable_data

def get_market_data(vegetable="टोमॅटो", market=None, details=False):
    """
    Get prices for a vegetable across different markets.
    If market is specified, returns detailed data for that market.
    """
    # Set seed for deterministic "random" data
    random.seed(hash(f"{vegetable}{datetime.now().strftime('%Y-%m-%d')}"))
    
    # Base price (same as in get_vegetable_data)
    base_prices = {
        "टोमॅटो": 40 + random.randint(-5, 10),
        "कांदा": 30 + random.randint(-3, 8),
        "बटाटा": 25 + random.randint(-2, 5),
        "वांगे": 35 + random.randint(-5, 8),
        "कोबी": 20 + random.randint(-3, 5),
        "फ्लॉवर": 45 + random.randint(-5, 10),
        "भेंडी": 60 + random.randint(-10, 15),
        "गाजर": 35 + random.randint(-5, 8)
    }
    
    base_price = base_prices.get(vegetable, 30)
    
    # Market price variation factors
    market_data = {
        "अपना बाजार मुंबई": round(base_price * 1.0, 2),
        "पुणे बाजार": round(base_price * 0.95, 2),
        "नागपूर बाजार": round(base_price * 0.85, 2),
        "नाशिक बाजार": round(base_price * 0.8, 2),
        "कोल्हापूर बाजार": round(base_price * 0.9, 2)
    }
    
    # If market is specified and details are requested
    if market and details:
        # Generate additional details for the market
        day_change = round(random.uniform(-3, 3), 2)
        
        # Demand levels (low, medium, high)
        demand_options = ["कमी", "मध्यम", "जास्त"]
        demand_level = demand_options[random.randint(0, 2)]
        
        # Availability (limited, moderate, abundant)
        availability_options = ["मर्यादित", "मध्यम", "भरपूर"]
        availability = availability_options[random.randint(0, 2)]
        
        return {
            "price": market_data[market],
            "day_change": day_change,
            "demand_level": demand_level,
            "availability": availability
        }
    
    # Return data for all markets
    return market_data

def get_trend_data(vegetable, market, timeframe):
    """
    Get historical price trend data for a vegetable in a specific market.
    """
    # Set seed for deterministic "random" data
    random.seed(hash(f"{vegetable}{market}{timeframe}"))
    
    # Current base price
    base_price = get_vegetable_data(vegetable, market)["current_price"]
    
    # Number of data points based on timeframe
    if timeframe == "दैनिक":
        days = 7
        interval = 1
    elif timeframe == "साप्ताहिक":
        days = 4 * 7  # 4 weeks
        interval = 7
    else:  # Monthly
        days = 6 * 30  # 6 months
        interval = 30
    
    # Generate dates and prices
    dates = []
    prices = []
    
    # Add some realistic variation based on seasonality and trends
    # Simulate a price trend with some randomness
    trend_direction = random.uniform(-0.2, 0.2)  # Overall trend
    volatility = random.uniform(0.03, 0.08)  # Daily price changes
    
    current_date = datetime.now()
    
    for i in range(0, days, interval):
        date = current_date - timedelta(days=i)
        dates.append(date)
        
        # Calculate price with trend, seasonality, and noise
        days_ago = i
        trend_factor = 1 + (trend_direction * days_ago / days)
        seasonal_factor = 1 + 0.1 * np.sin(days_ago / 30 * np.pi)  # Monthly seasonality
        noise_factor = 1 + random.uniform(-volatility, volatility)
        
        price = base_price * trend_factor * seasonal_factor * noise_factor
        prices.append(round(price, 2))
    
    # Reverse lists to have chronological order
    dates.reverse()
    prices.reverse()
    
    # Create result in the format expected by the UI
    result = []
    for i in range(len(dates)):
        result.append({
            "date": dates[i].strftime("%Y-%m-%d"),
            "price": prices[i]
        })
    
    return result

def get_demand_supply_data(vegetable):
    """
    Get demand and supply data for a specific vegetable.
    """
    # Set seed for deterministic "random" data
    random.seed(hash(f"{vegetable}{datetime.now().strftime('%Y-%m-%d')}"))
    
    # Generate demand and supply indices (0-10 scale)
    demand_index = round(random.uniform(3, 8), 1)
    supply_index = round(random.uniform(2, 9), 1)
    
    # Determine market state based on indices
    if supply_index > demand_index + 2:
        market_state = "surplus"
    elif demand_index > supply_index + 2:
        market_state = "shortage"
    else:
        market_state = "balanced"
    
    # Generate price prediction based on market state
    if market_state == "surplus":
        trend = "decrease"
        percent = random.randint(5, 15)
    elif market_state == "shortage":
        trend = "increase"
        percent = random.randint(8, 20)
    else:
        trend = "stable"
        percent = random.randint(2, 5)
    
    # Generate analysis text based on market state
    analysis_templates = {
        "surplus": f"वर्तमान बाजारपेठेत {vegetable} चा पुरवठा मागणीपेक्षा जास्त आहे. शेतकऱ्यांनी विक्रीसाठी आणण्यापूर्वी किंमती स्थिर होण्याची वाट पाहावी. किंवा स्टोरेज क्षमता वापरावी.",
        "shortage": f"सध्या {vegetable} ची मागणी पुरवठ्यापेक्षा जास्त आहे. शेतकऱ्यांनी तात्काळ विक्री करण्याचा विचार करावा कारण किंमती वाढत आहेत.",
        "balanced": f"{vegetable} साठी बाजारपेठ सध्या संतुलित आहे, मागणी आणि पुरवठा समान आहेत. नजीकच्या काळात किंमतीत मोठे बदल अपेक्षित नाहीत."
    }
    
    # Regional supply data
    regions = ["पश्चिम महाराष्ट्र", "विदर्भ", "मराठवाडा", "कोकण", "उत्तर महाराष्ट्र"]
    regional_supply = []
    
    for region in regions:
        regional_supply.append({
            "प्रदेश": region,
            "उत्पादन (मेट्रिक टन)": random.randint(100, 1000),
            "प्रति हेक्टर उत्पादन": round(random.uniform(5, 15), 2),
            "बाजारपेठेत आवक": ["कमी", "मध्यम", "जास्त"][random.randint(0, 2)]
        })
    
    # Supply forecast for next 7 days
    current_supply = random.randint(300, 800)
    daily_change = random.uniform(-0.1, 0.1)
    supply_forecast = []
    
    for i in range(7):
        forecast = current_supply * (1 + daily_change * i)
        supply_forecast.append(int(forecast))
    
    return {
        "demand_index": demand_index,
        "supply_index": supply_index,
        "market_state": market_state,
        "price_prediction": {
            "trend": trend,
            "percent": percent
        },
        "analysis": analysis_templates[market_state],
        "regional_supply": regional_supply,
        "supply_forecast": supply_forecast
    }
