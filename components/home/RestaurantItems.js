import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const RestaurantItems = ({ restaurantsData, navigation }) => {
  return (
    <>
      {restaurantsData.map((restaurant, index) => (
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginBottom: 0}}
          onPress={() => navigation.navigate('RestaurantDetail', {
            name: restaurant.name,
            image: restaurant.image_url,
            price: restaurant.price,
            reviews: restaurant.review_count,
            rating: restaurant.rating,
            categories: restaurant.categories
          })}
          key={index}
        >
          <View style={{ marginTop: 10, padding: 15, backgroundColor: 'white'}}>
            <RestaurantImage imageUrl={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

const RestaurantImage = ({ imageUrl }) => (
  <>
    <Image
      source={{ uri: imageUrl}}
      style={{ width: '100%', height: 180 }}
    />
    <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20}}>
      <MaterialCommunityIcons name='heart-outline' size={25} color='#fff' />
    </TouchableOpacity>
  </>

);

const RestaurantInfo = ({ name, rating }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: 'bold'}}>{name}</Text>
      <Text style={{ fontSize: 13, color: 'gray'}}>30-45 . min</Text>
    </View>
    <View
      style={{
        backgroundColor: '#eee',
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
      }}>
      <Text>{rating}</Text>
    </View>
  </View>
);
