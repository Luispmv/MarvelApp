import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import HomeScreen from "../screens/HomeScreen";
import ComicScreen from "../screens/ComicScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CharacterScreen from "../screens/CharacterScreen";
import TabNavigator from "../screens/TabNavigator";

const { createNativeStackNavigator } = require("@react-navigation/native-stack");

const Stack = createNativeStackNavigator()

export default function MainStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{headerShown:false}}
            >
                <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>

                <Stack.Screen name="RegistroScreen" component={RegistroScreen}></Stack.Screen>

                <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>

                <Stack.Screen name="ComicScreen" component={ComicScreen}></Stack.Screen>

                <Stack.Screen name="ProfileScreen" component={ProfileScreen}></Stack.Screen>

                <Stack.Screen name="CharacterScreen" component={CharacterScreen}></Stack.Screen>

                <Stack.Screen name="TabNavigator" component={TabNavigator} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}