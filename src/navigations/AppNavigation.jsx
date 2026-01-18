import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Auth from "./Auth";
import Tabs from "./Tabs";
import ProductDetail from "../screens/main/ProductDetail";
import OrderAccepted from "../screens/main/OrderAccepted";
import OrderFailed from "../screens/main/OrderFailed";
const Stack = createNativeStackNavigator();

const AppNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="auth">
                <Stack.Screen name="auth" component={Auth} />
                <Stack.Screen name="tabs" component={Tabs} />

                <Stack.Screen name="product-detail" component={ProductDetail} />
                <Stack.Screen name="order-accepted" component={OrderAccepted} />
                <Stack.Screen name="order-failed" component={OrderFailed} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation;