import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoriesCard from "./CategoriesCard";
import sanityClient, { urlFor } from "../../sanityFront";

const Categories = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		sanityClient
			.fetch(
				`
		*[_type == "category"]{
			...
		}`
			)
			.then((data) => {
				setCategories(data);
			});
	}, []);

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				paddingHorizontal: 15,
				paddingTop: 10,
			}}
		>
			{categories &&
				categories?.map((cat) => {
					return (
						<CategoriesCard
							key={cat?._id}
							imgUrl={
								cat?.image
									? urlFor(cat?.image).url()
									: "https://links.papareact.com/wru"
							}
							title={cat?.name}
						/>
					);
				})}
		</ScrollView>
	);
};

export default Categories;
