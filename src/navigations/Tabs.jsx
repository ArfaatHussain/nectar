import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/bottom-tabs/Home";
import Profile from "../screens/bottom-tabs/Profile";
import Favourite from "../screens/bottom-tabs/Favourite";
import Explore from "../screens/bottom-tabs/Explore";
import Cart from "../screens/bottom-tabs/Cart";
import { getDimensions } from "../utils/getDimensions";


const { height, width } = getDimensions();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // tabBarShowLabel: false,

        tabBarActiveTintColor: "#53B175",
        tabBarInactiveTintColor: "#808080",

        tabBarStyle: {
          height: height * 0.09,
          paddingTop:'5%'
        },

        tabBarItemStyle: {
          alignItems: 'center',
          flexDirection: 'row',
        },

        tabBarIconStyle: {
          marginTop: 0,
        },
        tabBarLabelStyle:{
          fontSize: height * 0.013,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "home") iconName = focused ? "home" : "home-outline";
          if (route.name === "explore") iconName = focused ? "search" : "search-outline";
          if( route.name === "cart") iconName = focused ? "cart" : "cart-outline";
          if (route.name === "favourite") iconName = focused ? "heart" : "heart-outline";
          if (route.name === "profile") iconName = focused ? "person" : "person-outline";

          return <Ionicons name={iconName} size={height * 0.03} color={color} />;
        },
      })}
    >
      <Tab.Screen name="home" component={Home} options={{tabBarLabel:'Shop'}} />
      <Tab.Screen name="explore" component={Explore} options={{tabBarLabel:'Explore'}} />
      <Tab.Screen name="cart" component={Cart} options={{tabBarLabel:'Cart'}} />
      <Tab.Screen name="favourite" component={Favourite} options={{tabBarLabel:'Favourites'}} />
      <Tab.Screen name="profile" component={Profile} options={{tabBarLabel:'Account', }} />
    </Tab.Navigator>
  );
};

export default Tabs;
