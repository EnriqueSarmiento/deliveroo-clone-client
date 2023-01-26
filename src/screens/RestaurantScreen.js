import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../../sanityFront";
import {
	ChevronDoubleDownIcon as CheveronDownIcon,
	UserIcon,
	AdjustmentsVerticalIcon as AdjusmentsIcon,
	MagnifyingGlassIcon as SearchIcon,
	ArrowLeftIcon,
	QuestionMarkCircleIcon,
	ArrowRightIcon,
} from "react-native-heroicons/outline";
import { StarIcon, MapIcon } from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const {
		params: {
			id,
			imgUrl,
			title,
			rating,
			genre,
			address,
			shortDescription,
			diches,
			long,
			lat,
		},
	} = useRoute();

	useEffect(() => {
		dispatch(
			setRestaurant({
				id,
				imgUrl,
				title,
				rating,
				genre,
				address,
				shortDescription,
				diches,
				long,
				lat,
			})
		);
	}, [dispatch]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<>
			<BasketIcon />
			<ScrollView>
				<View className="relative">
					<Image
						source={{
							uri: urlFor(imgUrl).url(),
						}}
						className="w-full h-64 bg-gray-300 p-4"
					/>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
					>
						<ArrowLeftIcon size={20} color="#00CCBB" />
					</TouchableOpacity>
				</View>
				<View className="bg-white">
					<View className="px-4 pt-4">
						<Text className="text-3xl font-bold">{title}</Text>
						<View className="flex-row space-x-2 my-1">
							<View className="flex-row items-center space-x-2">
								<StarIcon color="green" size={22} opacity={0.5} />
								<Text className="text-xs text-gray-400">
									<Text className="text-green-500">{rating}</Text> . {genre}
								</Text>
							</View>
							<View className="flex-row items-center space-x-2">
								<MapIcon color="gray" size={22} opacity={0.4} />
								<Text className="text-xs text-gray-400">Nerby: {address}</Text>
							</View>
						</View>
						<Text className="text-gray-500 mt-2 pb-4">{shortDescription}</Text>
					</View>
					<TouchableOpacity className="flex-row flex-1 items-center space-x-2 p-4 border-y border-gray-300">
						<QuestionMarkCircleIcon color="gray" size={22} opacity={0.5} />
						<Text className="pl-2 flex-1 text-md font-bold">
							Have a food alergy?
						</Text>
						<ArrowRightIcon size={22} color="#00CCBB" />
					</TouchableOpacity>
				</View>
				<View className="pb-36">
					<Text className="px-4 pt-6 mb-3 font-black text-xl">Menu</Text>
					{/* Dishes */}
					{diches?.length > 0 &&
						diches?.map((dish) => {
							return (
								<DishRow
									key={dish?._id}
									id={dish?._id}
									name={dish?.name}
									description={dish?.shortDescription}
									price={dish?.price}
									image={dish?.image}
								/>
							);
						})}
				</View>
			</ScrollView>
		</>
	);
};

export default RestaurantScreen;
