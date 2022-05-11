import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import LottieView from 'lottie-react-native';
import { firebase } from '../firebase';
import MenuItems from "../components/restaurantDetail/MenuItems";
import { ScrollView } from "react-native-gesture-handler";

const OrderCompleted = () => {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: 'Lasagna',
        description: 'With butter lettuce, tomato and sauce bechamel',
        price: '$13.50',
        image: 'https://www.simplyrecipes.com/thmb/xNRMdPJcmR20G5gcwBjndiMxYBk=/736x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2010__06__tandoori-chicken-horiz-a-1600-a92053df1c764ee1beaa91ae6383dcfd.jpg',
      }
    ]
  })
  // const [modalVisible, setModalVisible] = useState(false);
  const { items,  restaurantName} = useSelector((state) => state.cartReducer.selectedItems);
  
  const total = items.map(
    (item) => Number(item.price.replace('$', ''))
  ).reduce(
    (prev, curr) => prev + curr,
    0
  );

  const totalUSD = total.toLocaleString('en', {
    style: 'currency',
    currency: 'USD'
  });

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        })
      })
    return () => unsubscribe();
  }, [])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          margin: 15,
          alignItems: 'center',
          height: '100%'
        }}
      >
        <LottieView
          style={{
            height: 100,
            alignSelf: 'center',
            marginBottom: 30
          }}
          source={require('../assets/animations/check-mark.json')}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text
          style={{
            fontSize: 20, fontWeight: 'bold'
          }}
        >
          Your order at {restaurantName} is placed for {totalUSD}.
        </Text>
        <ScrollView>
          <MenuItems restaurantName={restaurantName} foods={lastOrder.items} hideCheckbox={true} marginLeft={10}/>
          <LottieView
            style={{
              height: 200,
              alignSelf: 'center',
              marginBottom: 30
            }}
            source={require('../assets/animations/cooking.json')}
            autoPlay
            speed={0.5}
            loop={false}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderCompleted;
