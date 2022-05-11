import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const HeaderTabs = ({ activeTab, setActiveTab }) => {
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      <HeaderButton
        text='Delivery'
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text='Pickup'
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
};

const HeaderButton = ({ text, setActiveTab, activeTab }) => (
    <TouchableOpacity
      style={{
        backgroundColor: activeTab === text? 'black' : 'white',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 30
      }}
      onPress={() => setActiveTab(text)}
    >
      <Text
        style={{
          color: activeTab === text? 'white' : 'black',
          fontSize: 15,
          fontWeight: "900" 
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
);

export default HeaderTabs;
