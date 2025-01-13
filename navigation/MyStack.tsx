import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../src/screens/SignUpScreen";
import LoginScreen from "../src/screens/Login";
import HomeScreen from "../src/screens/Home";
import Reel from "../src/screens/Reel";

const Stack = createStackNavigator();


export default function MyStack(){
    return(
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen}  />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Reel" component={Reel} />
         
        </Stack.Navigator>
    )
}