import {
	View,
	Text,
	SafeAreaView,
	Image,
	TextInput,
	ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	ChevronDoubleDownIcon as CheveronDownIcon,
	UserIcon,
	AdjustmentsVerticalIcon as AdjusmentsIcon,
	MagnifyingGlassIcon as SearchIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturerRow from "../components/FeaturerRow";
import sanityClient from "../../sanityFront.js";

const HomeScreen = () => {
	const navigation = useNavigation();
	const [featuredCategory, setFeaturedCategory] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		sanityClient
			.fetch(
				`
	*[_type == "featured"]{
		..., 
		  restaurants[] ->{
			 ...,
			dishes[] ->,
			 type-> {
				name
			 }
		  }
	  }
	`
			)
			.then((data) => {
				setFeaturedCategory(data);
			});
	}, []);

	return (
		<SafeAreaView className="bg-white pt-5">
			{/* header */}
			<View className="flex-row pb-4 items-center mx-4 space-x-2 px-4">
				<Image
					source={{
						uri: "https://links.papareact.com/wru",
					}}
					className="h-7 w-7 bg-red-300 p-4 rounded-full"
				/>
				<View className="flex-1">
					<Text className="font-bold text-xs text-gray-400">Delivery now!</Text>
					<View className="flex-row space-x-2 items-center">
						<Text className="font-bold text-xl">Current location</Text>
						<CheveronDownIcon size={20} color="#00CCBB" />
					</View>
				</View>
				<UserIcon size={35} color="#00CCBB" />
			</View>
			{/* search */}
			<View className="flex-row space-x-2 items-center justify-between pb-2 px-4">
				<View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 border border-gray-200 rounded-lg">
					<SearchIcon size={20} color="#cacaca" />
					<TextInput
						placeholder="Search something ..."
						keyboardType="default"
						className="text-white"
					/>
				</View>
				<AdjusmentsIcon size={25} color="#00CCBB" />
			</View>
			{/*Body */}
			<ScrollView className="bg-gray-100 pb-10">
				{/* categogies */}
				<Categories />
				{/* Feature rows */}

				{featuredCategory &&
					featuredCategory?.map((category) => {
						return (
							<FeaturerRow
								key={category?._id}
								id={category?._id}
								title={category?.name}
								description={category?.shortDescription}
								featuredCategory={"featured"}
							/>
						);
					})}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
