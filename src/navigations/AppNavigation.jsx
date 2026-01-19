import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import Auth from "./Auth";
import Tabs from "./Tabs";
import ProductDetail from "../screens/main/ProductDetail";
import OrderAccepted from "../screens/main/OrderAccepted";
import OrderFailed from "../screens/main/OrderFailed";
import ProductCategory from "../screens/main/ProductCategory";
import { DrawerToggleButton } from "@react-navigation/drawer";
import FilterProduct from "../screens/main/FilterProduct";
import CustomHeader from "../components/CustomHeader";

const Stack = createStackNavigator();

const AppNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="auth">
                <Stack.Screen name="auth" component={Auth} />
                <Stack.Screen name="tabs" component={Tabs}
                // options={({ navigation }) => ({
                //     headerLeft: () => (
                //         <DrawerToggleButton onPress={() => navigation.toggleDrawer()} />
                //     ),
                //     headerShown: true
                // })}
                />

                <Stack.Screen name="product-detail" component={ProductDetail} />
                <Stack.Screen name="order-accepted" component={OrderAccepted} />
                <Stack.Screen name="order-failed" component={OrderFailed} />
                <Stack.Screen name="product-category" component={ProductCategory} options={{
                    headerShown: true,
                    header: () => <CustomHeader title="Product Category" height={50} />,
                }} />

                <Stack.Screen name="filter-product" component={FilterProduct} options={{
                    headerShown: true,
                    header: () => <CustomHeader title="Filters" height={50} back={true} />,
                }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation;