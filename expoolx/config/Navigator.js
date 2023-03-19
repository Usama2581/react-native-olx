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
import { useIsFocused } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export default function Navigator() {
  const [user, setUser] = useState("");
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name=" " component={Tabnavigator} />
        <Stack.Screen name="Detail" component={user ? Details : Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sell" component={user ? Postad : Landing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabnavigator() {
  const Tab = createBottomTabNavigator();
  // const focused = useIsFocused();
  const [user, setUser] = useState("");
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          // position: 'absolute',
          //  bottom: 16,
          //  left: 16,
          //  right: 16,
          backgroundColor: "#E8E8E6",
          backgroundColor: "#F5F5F5",
        },
        tabBarLabelStyle: {
          fontSize: 17,
          color: "black",
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
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
        component={user ? Postad : Landing}
        options={({ route }) => {
          const focusedRouteName = getFocusedRouteNameFromRoute(route);
          // alert(focusedRouteName)
          if (focusedRouteName === "Landing") {
            return {
              tabBarStyle: { display: "flex" },
              headerShown: false,
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
            };
          }
          return {
            tabBarStyle: { display: "none" },
            headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <Icon
                    name={focused ? "add-circle" : "add-circle-outline"}
                    size={30}
                    color="black"
                    // color={focused ? 'white' : 'black'}
                  />
                );
              }
          };
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
