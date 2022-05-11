import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Divider } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";



const styles = StyleSheet.create({
  menuItemStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: '600'
  }
});

const MenuItems = ({ restaurantName, foods, hideCheckbox, marginLeft }) => {
  const dispatch = useDispatch();

  const selectItem = (item, checkboxValue) => dispatch({
    type: 'ADD_TO_CART',
    payload: { ...item, restaurantName: restaurantName, checkboxValue: checkboxValue }
  });

  const cartItems = useSelector(state => state.cartReducer.selectedItems.items);
  
  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find(item => item.title === food.title))

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {
        foods.map((food, index) => (
          <View key={index}>
            <View
              style={styles.menuItemStyle}
            >
              {hideCheckbox ? (<></>) : (<BouncyCheckbox
                iconStyle={{
                  borderColor: 'lightgray',
                  borderRadius: 0,
                }}
                fillColor='green'
                isChecked={isFoodInCart(food, cartItems)}
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
              />)}
              <FoodInfo food={food} />
              <FoodImage imageURL={food.image} marginLeft={marginLeft ? marginLeft : 0} />
            </View>
            <Divider width={0.5} orientation='vertical' style={{ marginHorizontal: 20 }} />
          </View>
        ))
      }
    </ScrollView>
  );
};

const FoodInfo = ({ food }) => (
  <View
    style={{
      width: 240,
      justifyContent: 'space-evenly',
      paddingHorizontal: 10
    }}
  >
    <Text style={styles.titleStyle}>{food.title}</Text>
    <Text>{food.description}</Text>
    <Text>{food.price}</Text>
  </View>
);

const FoodImage = ({ imageURL, marginLeft }) => (
  <View>
    <Image
      source={{ uri: imageURL }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: marginLeft
      }}
    />
  </View>
);

export default MenuItems;
