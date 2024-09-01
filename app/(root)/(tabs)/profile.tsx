import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TabsHeader from "@/components/nav/TabsHeader";
import { Image } from "expo-image";
import { icons } from "@/constants";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
    const [imageEditLoading, setImageEditLoading] = useState(false);

    const { user } = useUser();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.01,
            base64: true,
        });

        if (!result.canceled) {
            return result;
        }
        return null;
    };

    const onEditImagePress = async () => {
        try {
            const result = await pickImage();

            if (result) {
                const base64 = result.assets[0].base64;
                const mimeType = result.assets[0].mimeType;

                const image = `data:${mimeType};base64,${base64}`;
                setImageEditLoading(true);
                await user?.setProfileImage({
                    file: image,
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setImageEditLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex flex-1 flex-col items-center bg-general-500">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TabsHeader title={"Profile"} containerStyle="px-5" />
                <View
                    className={`h-28 w-28 rounded-full mx-auto border-2 border-white shadow-md shadow-neutral-400/70`}
                    style={{ elevation: 4 }}>
                    <Image
                        source={user?.imageUrl}
                        className={`w-full h-full rounded-full ${imageEditLoading ? "opacity-50" : ""}`}
                        contentFit={"cover"}
                    />
                    <TouchableOpacity
                        onPress={onEditImagePress}
                        className="bg-white p-1 rounded-full absolute bottom-1 right-1">
                        <Image source={icons.imageEdit} className="h-4 w-4" />
                    </TouchableOpacity>
                    {imageEditLoading && (
                        <View className="absolute flex w-full h-full justify-center">
                            <ActivityIndicator size={"small"} color={"#000"} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
