import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Text, View, FlatList, ActivityIndicator, Platform } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";
import TabsHeader from "@/components/nav/TabsHeader";

export default function Home() {
    const { setUserLocation, setDestinationLocation, userLatitude } = useLocationStore();
    const { user } = useUser();
    const { signOut } = useAuth();

    const { data: recentRides, loading, error } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

    const [hasPermissions, setHasPermissions] = useState(false);

    const getAndSetUserLocation = async () => {
        let location = await Location.getCurrentPositionAsync();

        const address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            address: `${address[0].name}, ${address[0].region}`,
        });
    };
    useEffect(() => {
        const requestLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setHasPermissions(false);
                return;
            }

            await getAndSetUserLocation();
        };

        requestLocation();
    }, []);

    const handleSignOut = () => {
        signOut();
        router.replace("/(auth)/sign-in");
    };

    const handleDestinationPress = (location: {
        latitude: number;
        longitude: number;
        address: string;
    }) => {
        setDestinationLocation(location);

        router.push("/(root)/find-ride");
    };

    return (
        <SafeAreaView className="bg-general-500">
            <FlatList
                data={recentRides?.slice(0, 5)}
                renderItem={({ item }) => <RideCard ride={item} />}
                keyExtractor={(item, index) => index.toString()}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 100,
                    paddingHorizontal: 20,
                }}
                ListEmptyComponent={() => (
                    <View className="flex flex-col items-center justify-center">
                        {!loading ? (
                            <>
                                <Image
                                    source={images.noResult}
                                    className="w-40 h-40"
                                    alt="No recent rides found"
                                    contentFit="contain"
                                />
                                <Text className="text-sm">No recent rides found</Text>
                            </>
                        ) : (
                            <ActivityIndicator size="small" color="#000" />
                        )}
                    </View>
                )}
                ListHeaderComponent={
                    <>
                        <TabsHeader title={`Welcome ${user?.firstName} 👋`} />

                        <GoogleTextInput
                            icon={icons.search}
                            containerStyle={`bg-white ${Platform.OS !== "android" ? "shadow-md shadow-neutral-300" : ""}`}
                            handlePress={handleDestinationPress}
                        />

                        <>
                            <Text className="text-xl font-JakartaBold mt-5 mb-3">
                                Your current location
                            </Text>
                            <View className="flex flex-row items-center bg-transparent h-[300px]">
                                <Map />
                            </View>
                        </>

                        <Text className="text-xl font-JakartaBold mt-5 mb-3">Recent Rides</Text>
                    </>
                }
            />
        </SafeAreaView>
    );
}
