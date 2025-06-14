import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import HomeScreen from "../screens/HomeScreen";
import ComicScreen from "../screens/ComicScreen";

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

            </Stack.Navigator>
        </NavigationContainer>
    )
}