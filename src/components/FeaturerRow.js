import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon as ArrowIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../../sanityFront";

const FeaturerRow = ({ id, title, description, featuredCategory }) => {
	const [restaurants, setRestaurants] = useState([]);
	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "featured" && _id == $id]{
			..., 
			restaurants[] -> {
			  ...,
			  dishes[] -> , 
			  type -> {
				 name
			  }
			}
		 }[0]`,
				{ id }
			)
			.then((data) => {
				setRestaurants(data?.restaurants);
			});
	}, [id]);

	return (
		<View>
			<View className="mt-4 flex-row text-center justify-between px-4">
				<Text className="font-bold text-lg capitalize">{title}</Text>
				<ArrowIcon size={20} color="#00CCBB" />
			</View>
			<Text className="text-xs text-gray-500 px-4">{description}</Text>
			<ScrollView
				horizontal
				contentContainerStyle={{
					paddingHorizontal: 15,
				}}
				showsHorizontalScrollIndicator={false}
				className="pt-4"
			>
				{/* Restaurant cards */}
				{restaurants &&
					restaurants?.map((res) => {
						return (
							<RestaurantCard
								key={res?._id}
								id={res?._id}
								imgUrl={res?.image}
								title={res?.title}
								rating={res?.rating}
								genre={res?.type?.name}
								address={res?.address}
								shortDescription={res?.shortDescription}
								diches={res?.dishes}
								long={res?.long}
								lat={res?.lat}
							/>
						);
					})}
			</ScrollView>
		</View>
	);
};

export default FeaturerRow;
