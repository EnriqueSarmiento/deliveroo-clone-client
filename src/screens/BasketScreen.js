import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { removeFromBasket, selectBasketItems } from "../features/basketSlice";
import { TrashIcon, XCircleIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native";
import { urlFor } from "../../sanityFront";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
	const navigation = useNavigation();
	const restaurant = useSelector(selectRestaurant);
	const items = useSelector(selectBasketItems);
	const [groupedItemInBasket, setGroupedItemsInBasket] = useState([]);
	const dispatch = useDispatch();

	useMemo(() => {
		const groupedItems = items.reduce((results, item) => {
			(results[item.id] = results[item.id] || []).push(item);
			return results;
		}, {});

		setGroupedItemsInBasket(groupedItems);
	}, [items]);

	console.log("el restaurant", restaurant);
	console.log("los elementos agrupados", groupedItemInBasket);
	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1 bg-gray-100">
				<View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
					<View>
						<Text className="text-lg font-bold text-center">Basket</Text>
						<Text className="text-gray-400 text-center capitalize">
							{restaurant.title}
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						className="rounded-full bg-gray-200 absolute top-3 right-5"
					>
						<XCircleIcon height={50} width={50} color="#00CCBB" />
					</TouchableOpacity>
				</View>
				<View className="flex-row items-center space-x-4 px-4 py-3 bg-white">
					<Image
						source={{
							uri: "https://links.papareact.com/wru",
						}}
						className="h-7 w-7 bg-gray-300 p-4 rounded-full"
					/>
					<Text className="flex-1">Delivery in 50-75 min</Text>
					<TouchableOpacity>
						<Text className="text-[#00CCBB]">change</Text>
					</TouchableOpacity>
				</View>

				<ScrollView>
					{Object.entries(groupedItemInBasket).map(([key, items]) => (
						<View
							key={key}
							className="flex-row items-center space-x-3 bg-white py-2 px-5"
						>
							<Text>{items.length} x</Text>
							<Image
								source={{
									uri: items[0]?.image
										? urlFor(items[0]?.image).url()
										: "https://links.papareact.com/wru",
								}}
								className="h-12 w-12 rounded-full"
							/>
							<Text className="flex-1">{items[0]?.name}</Text>
							<Text className="text-gray-600">
								<Currency quantity={items[0]?.price} currency="USD" />
							</Text>
							<TouchableOpacity
								onPress={() => dispatch(removeFromBasket({ id: key }))}
							>
								<Text className="text-xs text-[#00CCBB]">
									Remove
									<TrashIcon height={20} width={20} color="#00CCBB" />
								</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default BasketScreen;
