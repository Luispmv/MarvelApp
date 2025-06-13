import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";

const { createNativeStackNavigator } = require("@react-navigation/native-stack");

const Stack = createNativeStackNavigator()

export default function MainStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{headerShown:false}}
            >
                <Stack.Screen name="LoginScreen" component={LoginScreen}>

                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}