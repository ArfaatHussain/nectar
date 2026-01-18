import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Splash from "../screens/auth/Splash";
import Welcome from "../screens/auth/Welcome";
import EmailEnter from "../screens/auth/EmailEnter";
import Location from "../screens/auth/Location";
import LocationSearch from "../screens/auth/LocationSearch";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const Auth = ()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="splash" >
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="email-enter" component={EmailEnter} />
            <Stack.Screen name="location" component={Location} />
            <Stack.Screen name="location-search" component={LocationSearch} />
        </Stack.Navigator>
    )
}

export default Auth;