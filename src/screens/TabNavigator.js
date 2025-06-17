import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
// import ComicScreen from './screens/ComicScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComicScreen from './ComicScreen';
import CharacterScreen from './CharacterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function TabMainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ComicScreen" component={ComicScreen} />
      <Stack.Screen name="CharacterScreen" component={CharacterScreen} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
    </Stack.Navigator>
  );
}



const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icon = 'home';
          if (route.name === 'Perfil') icon = 'person';
          else if (route.name === 'Comics') icon = 'book';
          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarStyle:{
          backgroundColor:"black"
        },
        tabBarActiveTintColor: "#ED1D24",
        tabBarInactiveTintColor:"white"
      })}
    >
      <Tab.Screen name="Inicio" component={TabMainStack} />
      <Tab.Screen name="Perfil" component={ProfileScreen} /> 
    </Tab.Navigator>
  );
}