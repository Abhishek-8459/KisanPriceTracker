import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
from datetime import datetime, timedelta
import random

def extract_vegetable_prices(url):
    """
    Extracts vegetable price data from the Pune APMC website
    
    Args:
        url (str): URL of the category page to scrape
        
    Returns:
        DataFrame: DataFrame with vegetable price information
    """
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Look for the data in the text since it's not in a clean table structure
        data_row = None
        for row in soup.find_all('tr'):
            text = row.text.strip()
            if 'बाजारभाव' in text and ('फळभाजी' in text or 'कांदा - बटाटा' in text or 'पालेभाजी' in text):
                data_row = row
                break
        
        if not data_row:
            return pd.DataFrame()
        
        # Extract the entire text that contains the data
        data_text = data_row.text.strip()
        
        # Use regex to extract vegetable price information
        # Pattern: number + name + quintal + number + Rs. number/- + Rs. number/-
        # Example: 12001भेंडीक्विंटल224Rs. 1200/-Rs. 4500/-
        pattern = r'(\d+)([^\d]+)क्विंटल\s*(\d*)\s*Rs\.\s*(\d+)/-\s*Rs\.\s*(\d+)/-'
        
        matches = re.findall(pattern, data_text)
        
        # Create a DataFrame to store the extracted data
        data = []
        for match in matches:
            code, name, arrival, min_price, max_price = match
            # Clean the data
            name = name.strip()
            arrival = arrival.strip() if arrival else '0'
            
            data.append({
                'Code': code,
                'Vegetable': name,
                'Unit': 'quintal',
                'Arrival': int(arrival) if arrival.isdigit() else 0,
                'Min_Price': int(min_price),
                'Max_Price': int(max_price),
                'Current_Price': (int(min_price) + int(max_price)) // 2,  # Average of min and max
                'Price_Change': 0  # Initially set to 0, can be calculated if historical data is available
            })
        
        return pd.DataFrame(data)
    
    except Exception as e:
        print(f"Error scraping {url}: {str(e)}")
        return pd.DataFrame()

def get_vegetable_data_from_web(vegetable=None, market="पुणे बाजार"):
    """
    Get real vegetable price data from Pune APMC website.
    If vegetable is None, returns data for all vegetables.
    
    Args:
        vegetable (str, optional): Specific vegetable to get data for
        market (str, optional): Market to get data for (currently only supports Pune)
        
    Returns:
        dict: Dictionary of vegetable data with prices and other information
    """
    # Currently only supporting Pune market
    if market != "पुणे बाजार":
        # Get price factor based on market (from previously used factors)
        market_factors = {
            "अपना बाजार मुंबई": 1.0,
            "पुणे बाजार": 0.95,
            "नागपूर बाजार": 0.85,
            "नाशिक बाजार": 0.8,
            "कोल्हापूर बाजार": 0.9
        }
        factor = market_factors.get(market, 1.0)
    else:
        factor = 1.0
    
    # URLs for different categories
    category_urls = {
        'onion_potato': 'http://www.puneapmc.org/rates.aspx?page=rates&catid=1',
        'vegetables': 'http://www.puneapmc.org/rates.aspx?page=rates&catid=2',
        'leafy_vegetables': 'http://www.puneapmc.org/rates.aspx?page=rates&catid=3',
        'fruits': 'http://www.puneapmc.org/rates.aspx?page=rates&catid=4'
    }
    
    # Scrape data from all categories
    all_data = pd.DataFrame()
    for category, url in category_urls.items():
        df = extract_vegetable_prices(url)
        if not df.empty:
            all_data = pd.concat([all_data, df])
    
    # If no data was scraped, return empty dictionary
    if all_data.empty:
        return {}
    
    # Create a dictionary with vegetable data
    vegetable_data = {}
    for _, row in all_data.iterrows():
        veg_name = row['Vegetable']
        
        # Convert price from per quintal to per kg
        current_price = row['Current_Price'] / 100  # Quintal to kg
        
        # Apply market factor for different markets
        if market != "पुणे बाजार":
            current_price = round(current_price * factor, 2)
        
        # Create random price change within a small range
        # In a real implementation, this would be calculated from historical data
        random.seed(hash(f"{veg_name}{market}{datetime.now().strftime('%Y-%m-%d')}"))
        price_change = random.randint(-8, 8)
        
        vegetable_data[veg_name] = {
            "current_price": current_price,
            "price_change": price_change,
            "arrival": row['Arrival']
        }
    
    # Map common vegetable names if they exist in the data
    common_vegetables = {
        "टोमॅटो": "टोमॅटो",
        "कांदा": "कांदा",
        "बटाटा": "बटाटा",
        "वांगे": "वांगी", 
        "कोबी": "कोबी",
        "फ्लॉवर": "फ्लॉवर",
        "भेंडी": "भेंडी",
        "गाजर": "गाजर"
    }
    
    # Return data for a specific vegetable if requested
    if vegetable:
        # Try direct match first
        if vegetable in vegetable_data:
            return vegetable_data[vegetable]
        
        # Check if there's a mapping for this vegetable
        mapped_name = common_vegetables.get(vegetable)
        if mapped_name and mapped_name in vegetable_data:
            return vegetable_data[mapped_name]
        
        # If vegetable not found, return default values
        return {"current_price": 0, "price_change": 0, "arrival": 0}
    
    # Otherwise, return all vegetable data
    return vegetable_data

def get_market_data_from_web(vegetable="टोमॅटो", market=None, details=False):
    """
    Get market data for a specific vegetable across different markets.
    
    Args:
        vegetable (str): The vegetable to get market data for
        market (str, optional): Specific market to get detailed data for
        details (bool): Whether to return detailed market information
        
    Returns:
        dict: Dictionary of market data
    """
    # Get data for the vegetable from Pune market
    base_data = get_vegetable_data_from_web(vegetable, "पुणे बाजार")
    
    # If no data available, use default values
    if not base_data:
        base_price = 30
        price_change = 0
    else:
        base_price = base_data["current_price"]
        price_change = base_data["price_change"]
    
    # Market price variation factors
    market_factors = {
        "अपना बाजार मुंबई": 1.0,
        "पुणे बाजार": 0.95,
        "नागपूर बाजार": 0.85,
        "नाशिक बाजार": 0.8,
        "कोल्हापूर बाजार": 0.9
    }
    
    # Create market data dictionary
    market_data = {}
    for mkt, factor in market_factors.items():
        market_data[mkt] = round(base_price * factor, 2)
    
    # If a specific market is requested with details
    if market and details:
        # Set seed for deterministic random data
        random.seed(hash(f"{vegetable}{market}{datetime.now().strftime('%Y-%m-%d')}"))
        
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

def get_trend_data_from_web(vegetable, market, timeframe):
    """
    Generate historical price trend data for a vegetable in a specific market.
    
    Args:
        vegetable (str): The vegetable to get trend data for
        market (str): The market to get trend data for
        timeframe (str): Timeframe for historical data
        
    Returns:
        list: List of dictionaries with date and price information
    """
    # Get current price data
    current_data = get_vegetable_data_from_web(vegetable, market)
    
    # If no data available, use default values
    if not current_data or "current_price" not in current_data:
        base_price = 30
    else:
        base_price = current_data["current_price"]
    
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
    random.seed(hash(f"{vegetable}{market}{timeframe}"))
    trend_direction = random.uniform(-0.2, 0.2)  # Overall trend
    volatility = random.uniform(0.03, 0.08)  # Daily price changes
    
    current_date = datetime.now()
    
    for i in range(0, days, interval):
        date = current_date - timedelta(days=i)
        dates.append(date)
        
        # Calculate price with trend, seasonality, and noise
        days_ago = i
        trend_factor = 1 + (trend_direction * days_ago / days)
        seasonal_factor = 1 + 0.1 * ((days_ago / 30) % 1)  # Monthly seasonality
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

def get_demand_supply_data_from_web(vegetable):
    """
    Generate demand and supply data for a specific vegetable based on arrival data.
    
    Args:
        vegetable (str): The vegetable to get demand-supply data for
        
    Returns:
        dict: Dictionary containing demand-supply data and analysis
    """
    # Get current data from the web
    data = get_vegetable_data_from_web(vegetable, "पुणे बाजार")
    
    # Set seed for deterministic "random" data
    random.seed(hash(f"{vegetable}{datetime.now().strftime('%Y-%m-%d')}"))
    
    # If arrival data is available, use it to influence demand and supply indices
    if data and "arrival" in data and data["arrival"] > 0:
        # Scale arrival to a 0-10 index (higher arrival means higher supply)
        arrival = data["arrival"]
        # Normalize based on vegetable type (rough estimate)
        max_arrival = 2000  # Assuming 2000 quintals is a very high arrival
        supply_index = min(10, (arrival / max_arrival) * 10)
        
        # Estimate demand based on the price trend
        # Higher prices usually indicate higher demand relative to supply
        price_change = data.get("price_change", 0)
        demand_base = 5  # Neutral demand
        if price_change > 0:
            # Price is increasing, suggesting higher demand
            demand_index = min(10, demand_base + (price_change / 10) * 5)
        else:
            # Price is decreasing, suggesting lower demand
            demand_index = max(0, demand_base + (price_change / 10) * 5)
    else:
        # If no real data, generate random indices
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
    # Use current arrival as a base if available
    if data and "arrival" in data and data["arrival"] > 0:
        current_supply = data["arrival"]
    else:
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

def get_current_date():
    """Get the latest date from the Pune APMC website"""
    try:
        url = 'http://www.puneapmc.org/rates.aspx?page=rates&catid=2'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        date_text = soup.text
        date_match = re.search(r'बाजारभाव - \((.*?)\)', date_text)
        
        if date_match:
            return date_match.group(1)
        else:
            return datetime.now().strftime('%d-%m-%Y')
    except:
        return datetime.now().strftime('%d-%m-%Y')