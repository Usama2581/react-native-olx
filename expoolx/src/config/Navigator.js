import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Postad from "../screens/Postad";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Details from "../screens/Details";
import Chats from "../screens/Chats";
import Account from "../screens/Account";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Icon form 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/Ionicons";


export default function Navigator() {

  // const Stack = createNativeStackNavigator();
  const [user, setUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, [user]);

  return (
    <NavigationContainer>
      { user ? <StackNavigator /> : <AuthNavigator /> }
    </NavigationContainer>
  );
}




function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Tabnavigator} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="Details" component={Details} />
      {/* <Stack.Screen name="Sell" component={Postad} /> */}
    </Stack.Navigator>
  )
}


function AuthNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Landing" component={Landing} />
    </Stack.Navigator>
  )

}



function Tabnavigator() {

  const Tab = createBottomTabNavigator();
  // console.log('tab',user)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#E8E8E6",
          backgroundColor: "#F5F5F5",
        },
        tabBarLabelStyle: {
          fontSize: 17,
          color: "black",
          fontWeight: "500",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          // tabBarActiveBackgroundColor: 'white',
          // tabBarInactiveBackgroundColor: 'red',
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "home" : "home-outline"}
                size={30}
                color="black"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Sell"
        component={Postad}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "add-circle" : "add-circle-outline"}
                size={30}
                color="black"
              // color={focused ? 'white' : 'black'}
              />
            );
          },

        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chats}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "chatbox" : "chatbox-outline"}
                size={30}
                color="black"
              />
            );
          },
        }}
        size={30}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "person" : "person-outline"}
                size={30}
                color="black"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
