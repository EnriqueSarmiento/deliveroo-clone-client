import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import RestaurantScreen from "./src/screens/RestaurantScreen";
import BasketScreen from "./src/screens/BasketScreen";
import PreparingOrderScreen from "./src/screens/PreparingOrderScreen";

import { Provider } from "react-redux";
import { store } from "./store";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<TailwindProvider>
					<Stack.Navigator>
						<Stack.Screen name="HomeScreen" component={HomeScreen} />
						<Stack.Screen
							name="RestaurantScreen"
							component={RestaurantScreen}
						/>
						<Stack.Screen
							name="BasketScreen"
							component={BasketScreen}
							options={{
								presentation: "modal",
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="PreparingOrderScreen"
							component={PreparingOrderScreen}
						/>
					</Stack.Navigator>
				</TailwindProvider>
			</NavigationContainer>
		</Provider>
	);
}
