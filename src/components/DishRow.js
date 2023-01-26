import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../../sanityFront";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
	addToBasket,
	selectBasketItems,
	selectBasketItemsById,
	removeFromBasket,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
	const [isPressed, setIsPressed] = useState(false);
	const items = useSelector((state) => selectBasketItemsById(state, id));
	const dispatch = useDispatch();

	const addItemsToBasket = () => {
		dispatch(addToBasket({ id, name, description, price, image }));
	};

	const removeItemsFromBasket = () => {
		if (items.length > 0) {
			dispatch(removeFromBasket({ id }));
		}
	};
	console.log("los items", items);

	return (
		<>
			<TouchableOpacity
				onPress={() => setIsPressed(!isPressed)}
				className={`bg-white border p-4 border-gray-200 ${
					isPressed && "border-b-0"
				}`}
			>
				<View className="flex-row">
					<View className="flex-1 pr-2">
						<Text className="text-lg mb-1">{name}</Text>
						<Text className="text-gray-400">{description}</Text>
						<Text>
							<Currency quantity={price} currency="USD" />
						</Text>
					</View>
					<View>
						<Image
							style={{
								borderWidth: 1,
								borderColor: "#cacaca",
							}}
							source={{
								uri: image?.asset
									? urlFor(image).url()
									: "https://links.papareact.com/wru",
							}}
							className="h-20 w-20 bg-gray-300 p-4"
						/>
					</View>
				</View>
			</TouchableOpacity>
			{isPressed && (
				<View className="bg-white px-4">
					<View className="flex-row items-center space-x-2 pb-3">
						<TouchableOpacity
							onPress={removeItemsFromBasket}
							disabled={items.length == 0}
						>
							<MinusCircleIcon
								size={40}
								color={items.length > 0 ? `#00CCBB` : "gray"}
							/>
						</TouchableOpacity>
						<Text>{items.length}</Text>
						<TouchableOpacity onPress={addItemsToBasket}>
							<PlusCircleIcon size={40} color="#00CCBB" />
						</TouchableOpacity>
					</View>
				</View>
			)}
		</>
	);
};

export default DishRow;
