import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Image } from "expo-image";
import { icons, images } from "@/constants";
import TabsHeader from "@/components/nav/TabsHeader";
import RideCard from "@/components/RideCard";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";

export default function History() {
    const { user } = useUser();

    const { data: rides, loading, error } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

    return (
        <SafeAreaView className="bg-general-500 border flex-1">
            <FlatList
                data={rides}
                renderItem={({ item }) => <RideCard ride={item} />}
                keyExtractor={(item, index) => index.toString()}
                className="px-5"
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 100,
                    flexGrow: 1,
                }}
                ListEmptyComponent={() => (
                    <View className="flex flex-1 items-center justify-center">
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
                ListHeaderComponent={<TabsHeader title={"Rides"} />}
            />
        </SafeAreaView>
    );
}
