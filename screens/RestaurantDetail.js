import React from "react";
import { View, SafeAreaView } from "react-native";
import { Divider } from "react-native-elements";
import About from '../components/restaurantDetail/About';
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";

const foods = [
  {
    title: "Palak Panner",
    description:
      "Cottage cheese mixed with a creamy spinach sauce that is infused with spices.",
    price: "$14.50",
    image:
      "https://healthynibblesandbits.com/wp-content/uploads/2020/01/Saag-Paneer-1.jpg",
  },
  {
    title: "Butter Chicken",
    description: "Curry made from chicken with a spiced tomato and butter sauce",
    price: "$13.50",
    image:
      "https://leitesculinaria.com/wp-content/uploads/2021/09/butter-chicken.jpg",
  },
  {
    title: "Tandoori Chicken",
    description:
      "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
    price: "$19.20",
    image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
  },
  {
    title: "Chana Masala",
    description:
      "Vegetarian Indian chickpea curry",
    price: "$11.50",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chana-masala-fb809bc.jpg?quality=90&webp=true&resize=300,272",
  }
];

const RestaurantDetail = ({ route, navigation }) => {
  return (
    <View>
      <About route={route} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItems restaurantName={route.params.name} foods={foods}/>
      <ViewCart navigation={navigation} />
    </View>
  );
};

export default RestaurantDetail;
