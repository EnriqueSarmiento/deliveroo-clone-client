import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
	const navigation = useNavigation();
	useEffect(() => {
		setTimeout(() => {
			navigation.navigate("DeliveryScreen");
		}, 4000);
	}, []);

	return (
		<SafeAreaView className="bg-white flex-1 justify-center items-center">
			<Animatable.Image
				source={require("../../assets/giphy.gif")}
				animation="slideInUp"
				iterationCount={1}
				className="h-64 w-64"
			/>
			<Animatable.Text
				animation="slideInUp"
				iterationCount={1}
				className="text-lg my-10 text-[#00CCBB] font-bold text-center"
			>
				Waiting fot the restaurant to accept your order!
			</Animatable.Text>
			<Progress.Circle
				size={60}
				indeterminate
				color="#00CCBB"
				fill="#00000000"
			/>
		</SafeAreaView>
	);
};

export default PreparingOrderScreen;
