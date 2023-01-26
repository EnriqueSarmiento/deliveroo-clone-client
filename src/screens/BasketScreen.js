import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
	removeFromBasket,
	selectBasketItems,
	selectBasketTotal,
} from "../features/basketSlice";
import { TrashIcon, XCircleIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native";
import { urlFor } from "../../sanityFront";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
	const navigation = useNavigation();
	const restaurant = useSelector(selectRestaurant);
	const items = useSelector(selectBasketItems);
	const total = useSelector(selectBasketTotal);
	const [groupedItemInBasket, setGroupedItemsInBasket] = useState([]);
	const dispatch = useDispatch();

	useMemo(() => {
		const groupedItems = items.reduce((results, item) => {
			(results[item.id] = results[item.id] || []).push(item);
			return results;
		}, {});

		setGroupedItemsInBasket(groupedItems);
	}, [items]);

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
				<View className="flex-row items-center space-x-4 px-4 py-3 bg-white mb-4">
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

				<ScrollView className="divide-y divide-gray-200">
					{Object.entries(groupedItemInBasket).map(([key, items]) => {
						return (
							<View
								key={key}
								className="flex-row items-center space-x-3 bg-white py-2 px-5"
							>
								<Text className="text-[#00CCBB] capitalize">
									{items.length} x
								</Text>
								<Image
									source={{
										uri: items[0]?.image?.asset
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
									<Text className="text-xs text-[#00CCBB]">Remove</Text>
								</TouchableOpacity>
							</View>
						);
					})}
				</ScrollView>

				<View className="p-5 bg-white mt-5 space-y-4">
					<View className="flex-row justify-between">
						<Text className="text-gray-400 ">Subtotal</Text>
						<Text className="text-gray-400 ">
							<Currency quantity={total} currency="USD" />
						</Text>
					</View>
					<View className="flex-row justify-between">
						<Text className="text-gray-400 ">Delivery Fee</Text>
						<Text className="text-gray-400 ">
							<Currency quantity={5.99} currency="USD" />
						</Text>
					</View>
					<View className="flex-row justify-between">
						<Text className="font-bold text-xl">Order total: </Text>
						<Text className="font-bold text-xltext-black ">
							<Currency quantity={total + 5.99} currency="USD" />
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("PreparingOrderScreen")}
						className="rounded-lg bg-[#00CCBB] p-3"
					>
						<Text className="text-center text-white text-lg font-bold">
							Place order
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default BasketScreen;
