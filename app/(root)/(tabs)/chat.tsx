import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { images } from "@/constants";
import TabsHeader from "@/components/nav/TabsHeader";

export default function Chat() {
    return (
        <SafeAreaView className="flex flex-1 flex-col items-center px-5 bg-general-500">
            <TabsHeader title={"Chat List"} />
            <View className="flex flex-1 justify-center">
                <Image
                    source={images.message}
                    className="w-[264px] h-[115px]"
                    alt="No recent rides found"
                    contentFit="contain"
                />
                <Text className="text-3xl font-JakartaBold mt-12">No messages, yet.</Text>
                <Text className="text-base text-neutral-500 mt-2 mb-28">
                    No messages in your inbox, yet.
                </Text>
            </View>
        </SafeAreaView>
    );
}
