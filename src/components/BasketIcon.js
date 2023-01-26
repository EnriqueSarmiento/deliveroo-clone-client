import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
	const items = useSelector(selectBasketItems);
	const basketTotal = useSelector(selectBasketTotal);
	const navigation = useNavigation();

	console.log("el total", basketTotal);

	if (items.length === 0) return null;

	return (
		<View className="absolute bottom-10 w-full z-50">
			<TouchableOpacity
				onPress={() => navigation.navigate("BasketScreen")}
				className="bg-[#00CCBB] mx-5 p-4 flex-row items-center space-x-1 rounded-lg"
			>
				<Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
					{items.length}
				</Text>
				<Text className="flex-1 text-white font-extrabold text-lg text-center">
					View Basket
				</Text>
				<Text className="text-white font-extrabold text-lg">
					<Currency quantity={basketTotal} currency="USD" />
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default BasketIcon;
