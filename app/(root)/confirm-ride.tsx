import { router } from "expo-router";
import { FlatList, View } from "react-native";

import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useDriverStore } from "@/store";
import Button from "@/components/Button";

export default function ConfirmRide() {
    const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

    return (
        <RideLayout title={"Choose a Rider"} snapPoints={["65%", "85%"]}>
            <FlatList
                data={drivers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <DriverCard
                        item={item}
                        selected={selectedDriver!}
                        setSelected={() => setSelectedDriver(item.id)}
                    />
                )}
                ListFooterComponent={() => (
                    <View className="mx-5 mt-10">
                        <Button
                            title="Select Ride"
                            onPress={() => router.push("/(root)/book-ride")}
                        />
                    </View>
                )}
            />
        </RideLayout>
    );
}
