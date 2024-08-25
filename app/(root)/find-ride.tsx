import { Text, View } from "react-native";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function FindRide() {
    const { userAddress, setUserLocation, destinationAddress, setDestinationLocation } =
        useLocationStore();

    return (
        <RideLayout title={"Ride"} snapPoints={["85%"]}>
            <View className="my-3 ">
                <Text className="text-lg font-JakartaSemiBold mb-3">From: </Text>
                <GoogleTextInput
                    icon={icons.target}
                    initialLocation={userAddress!}
                    containerStyle="bg-neutral-100"
                    textInputBackgroundColor="#f5f5f5"
                    handlePress={(location) => setUserLocation(location)}
                />
            </View>
            <View className="my-3">
                <Text className="text-lg font-JakartaSemiBold mb-3">From: </Text>
                <GoogleTextInput
                    icon={icons.target}
                    initialLocation={destinationAddress!}
                    containerStyle="bg-neutral-100"
                    textInputBackgroundColor="transparent"
                    handlePress={(location) => setDestinationLocation(location)}
                />
            </View>

            <Button
                title={"Find now"}
                onPress={() => router.push("/(root)/confirm-ride")}
                className="mt-5"
            />
        </RideLayout>
    );
}
