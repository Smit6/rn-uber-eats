import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import BottomTab from "../components/home/BottomTab";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs";
import { RestaurantItems } from "../components/home/RestaurantItems";
import SearchBar from "../components/home/SearchBar";

// ENTER YOUR API KEY
const YELP_API_KEY = "YOUR_API_KEY"

const Home = ({ navigation }) => {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [city, setCity] = useState(['San Francisco']);
  const [activeTab, setActiveTab] = useState('Delivery');
  
  const getRestaurantsFromYelp = () => {
    const yelpURL = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const optionsAPI = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      },
    };

    return fetch(yelpURL, optionsAPI)
      .then(res => res.json())
      .then(json => setRestaurantsData(json.businesses.filter((business) => business.transactions.includes(activeTab.toLowerCase()))));
  };

  useEffect(() => {
    getRestaurantsFromYelp()
  }, [city, activeTab])

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <View style={{ backgroundColor: 'white', padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantsData={restaurantsData} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTab />
    </SafeAreaView>
  );
};

export default Home;
