import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import numpy as np
import base64
from translator import translate, TRANSLATIONS
from data import get_vegetable_data, get_market_data, get_trend_data, get_demand_supply_data
from utils import format_price, get_vegetable_icon, get_market_icon

# Try to import web scraper functions for data source info
try:
    from web_scraper import get_current_date
    WEB_SCRAPER_AVAILABLE = True
except ImportError:
    WEB_SCRAPER_AVAILABLE = False

# Set page configuration
st.set_page_config(
    page_title="कृषी प्रवाह | Krushi Pravah",
    page_icon="assets/images/krushi_pravah_logo.svg",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load CSS
with open('assets/styles.css') as f:
    st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

# Function to get base64 encoded image for background
def get_background_image_base64(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode()
    return f"data:image/svg+xml;base64,{encoded_string}"

# Initialize session state for language preference
if 'language' not in st.session_state:
    st.session_state['language'] = "marathi"  # Default language

def change_language():
    if st.session_state['language'] == "marathi":
        st.session_state['language'] = "english"
    else:
        st.session_state['language'] = "marathi"
    st.rerun()

# Language toggle in sidebar
with st.sidebar:
    lang = st.session_state['language']
    
    # Display app logo
    st.image("assets/images/krushi_pravah_logo.svg", width=100)
    st.title(translate("कृषी प्रवाह", lang))
    
    # Language toggle button
    if lang == "marathi":
        st.button("Switch to English", on_click=change_language)
    else:
        st.button("मराठीमध्ये बदला", on_click=change_language)
    
    # Sidebar navigation
    st.header(translate("मेनू", lang))
    page = st.radio(
        translate("पृष्ठ निवडा", lang),
        [translate("मुख्यपृष्ठ", lang), 
         translate("बाजार तुलना", lang), 
         translate("मूल्य प्रवृत्ती", lang),
         translate("मागणी आणि पुरवठा", lang)]
    )
    
    # Footer
    st.sidebar.markdown("---")
    st.sidebar.caption(translate("© 2025 कृषी प्रवाह", lang))

# Main content
lang = st.session_state['language']  # Get current language

# HOMEPAGE
if page == translate("मुख्यपृष्ठ", lang):
    # Set background image
    farm_bg = get_background_image_base64("assets/images/farm_background.svg")
    st.markdown(
        f"""
        <div style="
            background-image: url('{farm_bg}');
            background-size: cover;
            background-position: center;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        ">
            <h1 style="color: #fff; text-shadow: 2px 2px 4px #000;">{translate("कृषी प्रवाह", lang)}</h1>
            <h3 style="color: #fff; text-shadow: 1px 1px 2px #000;">{translate("महाराष्ट्र भाजीपाला मूल्य विश्लेषक", lang)}</h3>
        </div>
        """, 
        unsafe_allow_html=True
    )
    st.subheader(translate("आजचे बाजारभाव", lang))
    
    # Filters
    col1, col2 = st.columns(2)
    with col1:
        market_options = ["अपना बाजार मुंबई", "पुणे बाजार", "नागपूर बाजार", "नाशिक बाजार", "कोल्हापूर बाजार"]
        selected_market = st.selectbox(
            translate("बाजार निवडा", lang),
            [translate(market, lang) for market in market_options]
        )
        # Convert back to original for data lookup
        for m in market_options:
            if translate(m, lang) == selected_market:
                selected_market_orig = m
                break
    
    with col2:
        vegetable_options = ["टोमॅटो", "कांदा", "बटाटा", "वांगे", "कोबी", "फ्लॉवर", "भेंडी", "गाजर"]
        selected_vegetable = st.selectbox(
            translate("भाजी निवडा", lang),
            [translate(veg, lang) for veg in vegetable_options]
        )
        # Convert back to original for data lookup
        for v in vegetable_options:
            if translate(v, lang) == selected_vegetable:
                selected_vegetable_orig = v
                break
    
    # Current price card
    vegetable_data = get_vegetable_data(selected_vegetable_orig, selected_market_orig)
    
    st.markdown("### " + translate("वर्तमान किंमत", lang))
    price_col1, price_col2 = st.columns([1, 3])
    with price_col1:
        st.markdown(get_vegetable_icon(selected_vegetable_orig), unsafe_allow_html=True)
    with price_col2:
        st.markdown(f"### {translate(selected_vegetable_orig, lang)}")
        st.markdown(f"#### ₹ {vegetable_data['current_price']}/kg")
        
        # Price change indicator
        price_change = vegetable_data['price_change']
        if price_change > 0:
            st.markdown(f"<span style='color:red'>▲ ₹{price_change}/kg {translate('गेल्या आठवड्यापासून', lang)}</span>", unsafe_allow_html=True)
        elif price_change < 0:
            st.markdown(f"<span style='color:green'>▼ ₹{abs(price_change)}/kg {translate('गेल्या आठवड्यापासून', lang)}</span>", unsafe_allow_html=True)
        else:
            st.markdown(f"<span>→ {translate('कोणताही बदल नाही', lang)}</span>", unsafe_allow_html=True)
    
    # Today's top vegetables
    st.markdown("### " + translate("आजचे सर्वोत्तम भाज्या", lang))
    top_vegetables = get_vegetable_data(market=selected_market_orig)
    
    # Create columns for each vegetable
    cols = st.columns(4)
    for i, (veg, data) in enumerate(list(top_vegetables.items())[:4]):
        with cols[i]:
            st.markdown(get_vegetable_icon(veg), unsafe_allow_html=True)
            st.markdown(f"#### {translate(veg, lang)}")
            st.markdown(f"₹ {data['current_price']}/kg")
            # Price change indicator
            price_change = data['price_change']
            if price_change > 0:
                st.markdown(f"<span style='color:red'>▲ ₹{price_change}</span>", unsafe_allow_html=True)
            elif price_change < 0:
                st.markdown(f"<span style='color:green'>▼ ₹{abs(price_change)}</span>", unsafe_allow_html=True)
            else:
                st.markdown(f"<span>→</span>", unsafe_allow_html=True)
    
    # Quick market overview
    st.markdown("### " + translate("बाजार तुलना", lang))
    market_data = get_market_data(selected_vegetable_orig)
    
    # Create columns for markets
    market_cols = st.columns(len(market_data))
    for i, (market, price) in enumerate(market_data.items()):
        with market_cols[i]:
            st.markdown(get_market_icon(market), unsafe_allow_html=True)
            st.markdown(f"#### {translate(market, lang)}")
            st.markdown(f"₹ {price}/kg")
    
    # Last updated info
    st.markdown("---")
    st.caption(f"{translate('अंतिम अद्यतनित', lang)}: {datetime.now().strftime('%d-%m-%Y %H:%M')}")

# MARKET COMPARISON PAGE
elif page == translate("बाजार तुलना", lang):
    # Set background image
    market_bg = get_background_image_base64("assets/images/market_background.svg")
    st.markdown(
        f"""
        <div style="
            background-image: url('{market_bg}');
            background-size: cover;
            background-position: center;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        ">
            <h1 style="color: #fff; text-shadow: 2px 2px 4px #000;">{translate("बाजार तुलना", lang)}</h1>
        </div>
        """, 
        unsafe_allow_html=True
    )
    
    # Vegetable selection
    vegetable_options = ["टोमॅटो", "कांदा", "बटाटा", "वांगे", "कोबी", "फ्लॉवर", "भेंडी", "गाजर"]
    selected_vegetable = st.selectbox(
        translate("भाजी निवडा", lang),
        [translate(veg, lang) for veg in vegetable_options]
    )
    # Convert back to original for data lookup
    for v in vegetable_options:
        if translate(v, lang) == selected_vegetable:
            selected_vegetable_orig = v
            break
    
    # Get market data for selected vegetable
    market_data = get_market_data(selected_vegetable_orig)
    
    # Create dataframe for plotting
    market_df = pd.DataFrame({
        'Market': [translate(market, lang) for market in market_data.keys()],
        'Price': list(market_data.values())
    })
    
    # Create bar chart
    fig = px.bar(
        market_df, 
        x='Market', 
        y='Price',
        title=f"{translate(selected_vegetable_orig, lang)} {translate('के मूल्य (रु./किलो)', lang)}",
        color='Price',
        color_continuous_scale=px.colors.sequential.Greens
    )
    
    fig.update_layout(
        xaxis_title=translate("बाजार", lang),
        yaxis_title=translate("किंमत (रु./किलो)", lang),
        height=500
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Market details table
    st.subheader(translate("बाजार तपशील", lang))
    
    # Create more detailed market data
    detailed_data = []
    for market, price in market_data.items():
        # Get some additional details for each market
        market_details = get_market_data(selected_vegetable_orig, market, details=True)
        detailed_data.append({
            translate("बाजार", lang): translate(market, lang),
            translate("किंमत (रु./किलो)", lang): price,
            translate("आज तुलनेत कालचे", lang): market_details["day_change"],
            translate("मागणी पातळी", lang): translate(market_details["demand_level"], lang),
            translate("उपलब्धता", lang): translate(market_details["availability"], lang)
        })
    
    detailed_df = pd.DataFrame(detailed_data)
    st.dataframe(detailed_df, use_container_width=True)
    
    # Last updated info
    st.markdown("---")
    st.caption(f"{translate('अंतिम अद्यतनित', lang)}: {datetime.now().strftime('%d-%m-%Y %H:%M')}")

# PRICE TRENDS PAGE
elif page == translate("मूल्य प्रवृत्ती", lang):
    # Set background image
    chart_bg = get_background_image_base64("assets/images/chart_background.svg")
    st.markdown(
        f"""
        <div style="
            background-image: url('{chart_bg}');
            background-size: cover;
            background-position: center;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        ">
            <h1 style="color: #fff; text-shadow: 2px 2px 4px #000;">{translate("मूल्य प्रवृत्ती", lang)}</h1>
        </div>
        """, 
        unsafe_allow_html=True
    )
    
    # Filters
    col1, col2, col3 = st.columns(3)
    with col1:
        vegetable_options = ["टोमॅटो", "कांदा", "बटाटा", "वांगे", "कोबी", "फ्लॉवर", "भेंडी", "गाजर"]
        selected_vegetable = st.selectbox(
            translate("भाजी निवडा", lang),
            [translate(veg, lang) for veg in vegetable_options]
        )
        # Convert back to original for data lookup
        for v in vegetable_options:
            if translate(v, lang) == selected_vegetable:
                selected_vegetable_orig = v
                break
    
    with col2:
        market_options = ["अपना बाजार मुंबई", "पुणे बाजार", "नागपूर बाजार", "नाशिक बाजार", "कोल्हापूर बाजार"]
        selected_market = st.selectbox(
            translate("बाजार निवडा", lang),
            [translate(market, lang) for market in market_options]
        )
        # Convert back to original for data lookup
        for m in market_options:
            if translate(m, lang) == selected_market:
                selected_market_orig = m
                break
    
    with col3:
        timeframe_options = ["दैनिक", "साप्ताहिक", "मासिक"]
        selected_timeframe = st.selectbox(
            translate("कालावधी निवडा", lang),
            [translate(tf, lang) for tf in timeframe_options]
        )
        # Convert back to original for data lookup
        for tf in timeframe_options:
            if translate(tf, lang) == selected_timeframe:
                selected_timeframe_orig = tf
                break
    
    # Get trend data
    trend_data = get_trend_data(selected_vegetable_orig, selected_market_orig, selected_timeframe_orig)
    
    # Create dataframe for plotting
    trend_df = pd.DataFrame(trend_data)
    
    # Create line chart
    fig = px.line(
        trend_df, 
        x='date', 
        y='price',
        title=f"{translate(selected_vegetable_orig, lang)} {translate('मूल्य प्रवृत्ती', lang)} - {translate(selected_market_orig, lang)}",
        markers=True
    )
    
    fig.update_layout(
        xaxis_title=translate("तारीख", lang),
        yaxis_title=translate("किंमत (रु./किलो)", lang),
        height=500
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Price statistics
    st.subheader(translate("मूल्य आकडेवारी", lang))
    
    stats_col1, stats_col2, stats_col3, stats_col4 = st.columns(4)
    
    with stats_col1:
        st.metric(
            label=translate("सरासरी किंमत", lang),
            value=f"₹ {trend_df['price'].mean():.2f}"
        )
    
    with stats_col2:
        st.metric(
            label=translate("सर्वाधिक किंमत", lang),
            value=f"₹ {trend_df['price'].max():.2f}"
        )
    
    with stats_col3:
        st.metric(
            label=translate("किमान किंमत", lang),
            value=f"₹ {trend_df['price'].min():.2f}"
        )
    
    with stats_col4:
        # Calculate net change and percentage
        first_price = trend_df['price'].iloc[0]
        last_price = trend_df['price'].iloc[-1]
        net_change = last_price - first_price
        pct_change = (net_change / first_price) * 100 if first_price > 0 else 0
        
        st.metric(
            label=translate("शुद्ध बदल", lang),
            value=f"₹ {net_change:.2f}",
            delta=f"{pct_change:.1f}%"
        )
    
    # Price forecast - just a simple extrapolation based on trend
    st.subheader(translate("मूल्य अंदाज", lang))
    st.caption(translate("(साध्या प्रवृत्ती विश्लेषणावर आधारित)", lang))
    
    # Simple linear extrapolation for next 7 days
    dates = pd.to_datetime(trend_df['date'])
    prices = trend_df['price'].values
    
    # Create a numeric x-axis (days since first date)
    x = np.array([(date - dates.iloc[0]).days for date in dates])
    
    # Linear regression coefficients
    if len(x) > 1:  # Make sure we have at least 2 points
        z = np.polyfit(x, prices, 1)
        slope = z[0]
        intercept = z[1]
        
        # Create future dates
        future_days = 7
        future_x = np.array(range(max(x) + 1, max(x) + 1 + future_days))
        future_dates = [dates.iloc[0] + timedelta(days=int(day)) for day in future_x]
        
        # Predict future prices
        future_prices = slope * future_x + intercept
        
        # Create forecast dataframe
        forecast_df = pd.DataFrame({
            'date': future_dates,
            'price': future_prices
        })
        
        # Create combined dataframe for visualization
        combined_df = pd.concat([trend_df, forecast_df])
        combined_df['type'] = ['historical'] * len(trend_df) + ['forecast'] * len(forecast_df)
        
        # Plot with different colors for historical and forecast
        fig = px.line(
            combined_df,
            x='date',
            y='price',
            color='type',
            title=translate("मूल्य प्रवृत्ती आणि अंदाज", lang),
            color_discrete_map={'historical': 'blue', 'forecast': 'red'},
            labels={'historical': translate('ऐतिहासिक', lang), 'forecast': translate('अंदाज', lang)}
        )
        
        fig.update_layout(
            xaxis_title=translate("तारीख", lang),
            yaxis_title=translate("किंमत (रु./किलो)", lang),
            height=400
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Show forecast table
        forecast_display = forecast_df.copy()
        forecast_display['date'] = forecast_display['date'].dt.strftime('%d-%m-%Y')
        forecast_display['price'] = forecast_display['price'].apply(lambda x: f"₹ {x:.2f}")
        forecast_display.columns = [translate("तारीख", lang), translate("अंदाजित किंमत", lang)]
        
        st.dataframe(forecast_display, use_container_width=True)
    else:
        st.warning(translate("पुरेशी डेटा उपलब्ध नाही अंदाज काढण्यासाठी", lang))
    
    # Last updated info
    st.markdown("---")
    st.caption(f"{translate('अंतिम अद्यतनित', lang)}: {datetime.now().strftime('%d-%m-%Y %H:%M')}")

# DEMAND AND SUPPLY PAGE
elif page == translate("मागणी आणि पुरवठा", lang):
    # Set background image
    supply_demand_bg = get_background_image_base64("assets/images/supply_demand_background.svg")
    st.markdown(
        f"""
        <div style="
            background-image: url('{supply_demand_bg}');
            background-size: cover;
            background-position: center;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        ">
            <h1 style="color: #fff; text-shadow: 2px 2px 4px #000;">{translate("मागणी आणि पुरवठा", lang)}</h1>
        </div>
        """, 
        unsafe_allow_html=True
    )
    
    # Vegetable selection
    vegetable_options = ["टोमॅटो", "कांदा", "बटाटा", "वांगे", "कोबी", "फ्लॉवर", "भेंडी", "गाजर"]
    selected_vegetable = st.selectbox(
        translate("भाजी निवडा", lang),
        [translate(veg, lang) for veg in vegetable_options]
    )
    # Convert back to original for data lookup
    for v in vegetable_options:
        if translate(v, lang) == selected_vegetable:
            selected_vegetable_orig = v
            break
    
    # Get demand-supply data
    demand_supply_data = get_demand_supply_data(selected_vegetable_orig)
    
    # Display demand-supply gauge chart
    st.subheader(translate("वर्तमान मागणी-पुरवठा संतुलन", lang))
    
    gauge_col1, gauge_col2 = st.columns([1, 1])
    
    with gauge_col1:
        # Create demand gauge
        demand_level = demand_supply_data['demand_index']
        
        fig = go.Figure(go.Indicator(
            mode="gauge+number",
            value=demand_level,
            title={'text': translate("मागणी निर्देशांक", lang)},
            gauge={
                'axis': {'range': [0, 10]},
                'bar': {'color': "darkblue"},
                'steps': [
                    {'range': [0, 3.33], 'color': "lightgreen"},
                    {'range': [3.33, 6.66], 'color': "yellow"},
                    {'range': [6.66, 10], 'color': "salmon"}
                ],
                'threshold': {
                    'line': {'color': "red", 'width': 4},
                    'thickness': 0.75,
                    'value': demand_level
                }
            }
        ))
        
        fig.update_layout(height=300)
        st.plotly_chart(fig, use_container_width=True)
    
    with gauge_col2:
        # Create supply gauge
        supply_level = demand_supply_data['supply_index']
        
        fig = go.Figure(go.Indicator(
            mode="gauge+number",
            value=supply_level,
            title={'text': translate("पुरवठा निर्देशांक", lang)},
            gauge={
                'axis': {'range': [0, 10]},
                'bar': {'color': "darkgreen"},
                'steps': [
                    {'range': [0, 3.33], 'color': "salmon"},
                    {'range': [3.33, 6.66], 'color': "yellow"},
                    {'range': [6.66, 10], 'color': "lightgreen"}
                ],
                'threshold': {
                    'line': {'color': "green", 'width': 4},
                    'thickness': 0.75,
                    'value': supply_level
                }
            }
        ))
        
        fig.update_layout(height=300)
        st.plotly_chart(fig, use_container_width=True)
    
    # Display analysis
    st.subheader(translate("बाजारपेठ विश्लेषण", lang))
    
    analysis_col1, analysis_col2 = st.columns([2, 1])
    
    with analysis_col1:
        st.write(translate(demand_supply_data['analysis'], lang))
        
        # Price prediction
        st.subheader(translate("मूल्य अंदाज", lang))
        price_trend = demand_supply_data['price_prediction']['trend']
        price_pct = demand_supply_data['price_prediction']['percent']
        
        if price_trend == "increase":
            st.markdown(f"<span style='color:red'>▲ {translate('वाढण्याची शक्यता', lang)} (~{price_pct}%)</span>", unsafe_allow_html=True)
        elif price_trend == "decrease":
            st.markdown(f"<span style='color:green'>▼ {translate('कमी होण्याची शक्यता', lang)} (~{price_pct}%)</span>", unsafe_allow_html=True)
        else:
            st.markdown(f"<span style='color:blue'>→ {translate('स्थिर राहण्याची शक्यता', lang)}</span>", unsafe_allow_html=True)
    
    with analysis_col2:
        # Market equilibrium state
        equilibrium = demand_supply_data['market_state']
        
        if equilibrium == "surplus":
            st.success(translate("पुरवठा अधिक", lang))
            st.markdown(get_vegetable_icon(selected_vegetable_orig) + " 📈", unsafe_allow_html=True)
        elif equilibrium == "shortage":
            st.error(translate("पुरवठा कमी", lang))
            st.markdown(get_vegetable_icon(selected_vegetable_orig) + " 📉", unsafe_allow_html=True)
        else:
            st.info(translate("संतुलित बाजारपेठ", lang))
            st.markdown(get_vegetable_icon(selected_vegetable_orig) + " ↔️", unsafe_allow_html=True)
    
    # Regional supply table
    st.subheader(translate("प्रादेशिक पुरवठा", lang))
    
    regional_data = demand_supply_data['regional_supply']
    regional_df = pd.DataFrame(regional_data)
    
    # Convert column names to selected language
    regional_df.columns = [translate(col, lang) for col in regional_df.columns]
    
    st.dataframe(regional_df, use_container_width=True)
    
    # Supply forecast
    st.subheader(translate("पुढील 7 दिवसांसाठी पुरवठा अंदाज", lang))
    
    supply_forecast = demand_supply_data['supply_forecast']
    dates = [datetime.now() + timedelta(days=i) for i in range(7)]
    
    forecast_df = pd.DataFrame({
        'date': dates,
        'supply': supply_forecast
    })
    
    fig = px.bar(
        forecast_df,
        x='date',
        y='supply',
        title=translate("पुरवठा अंदाज (मेट्रिक टन)", lang),
        color='supply',
        color_continuous_scale=px.colors.sequential.Greens
    )
    
    fig.update_layout(
        xaxis_title=translate("तारीख", lang),
        yaxis_title=translate("अंदाजित पुरवठा (मेट्रिक टन)", lang),
        height=400
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Last updated info
    st.markdown("---")
    st.caption(f"{translate('अंतिम अद्यतनित', lang)}: {datetime.now().strftime('%d-%m-%Y %H:%M')}")
