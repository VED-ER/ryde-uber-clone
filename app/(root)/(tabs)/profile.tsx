import { SafeAreaView } from "react-native-safe-area-context";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import TabsHeader from "@/components/nav/TabsHeader";
import { Image } from "expo-image";
import { icons } from "@/constants";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { ReactNativeModal } from "react-native-modal";

export default function Profile() {
    const [imageEditLoading, setImageEditLoading] = useState(false);
    const [bottomSheetInputValue, setBottomSheetInputValue] = useState("");
    const [bottomSheetInputLabel, setBottomSheetInputLabel] = useState("");
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [bottomSheetInputField, setBottomSheetInputField] = useState("");
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

    const params = new URLSearchParams();

    params.set("height", "112");
    params.set("width", "112");
    params.set("quality", "100");
    params.set("fit", "crop");

    const imageSrc = `${user?.imageUrl}?${params.toString()}`;

    const onBottomSheetSaveButtonPress = async () => {
        try {
            user?.update({
                [bottomSheetInputField]: bottomSheetInputValue,
            });
            setBottomSheetVisible(false);
        } catch (err: any) {
            Alert.alert("Error", err.errors[0].longMessage);
        }
    };

    const onEditFirstNamePress = async () => {
        setBottomSheetVisible(true);
        setBottomSheetInputField("firstName");
        setBottomSheetInputValue(user?.firstName || "");
        setBottomSheetInputLabel("First Name");
    };

    const onEditLastNamePress = async () => {
        setBottomSheetVisible(true);
        setBottomSheetInputField("lastName");
        setBottomSheetInputValue(user?.lastName || "");
        setBottomSheetInputLabel("Last Name");
    };

    return (
        <SafeAreaView className="flex flex-1 flex-col items-center bg-general-500">
            <ScrollView
                keyboardShouldPersistTaps={"handled"}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: Platform.OS === "ios" ? 90 : 120,
                }}>
                <TabsHeader title={"Profile"} containerStyle="px-5" />
                <View
                    className={`h-28 w-28 rounded-full mx-auto border-2 border-white ${Platform.OS !== "android" ? "shadow-lg shadow-neutral-400/70" : ""}`}
                    style={{ elevation: 10 }}>
                    <Image
                        source={imageSrc}
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

                <View className="p-5 bg-white rounded-2xl mx-5 mt-8">
                    <InputField
                        label="First Name"
                        placeholder="todo"
                        value={user?.firstName || ""}
                        editable={false}
                        iconRight={icons.inputEdit}
                        onIconRightPress={onEditFirstNamePress}
                    />
                    <InputField
                        label="Last Name"
                        placeholder="tood"
                        value={user?.lastName || ""}
                        editable={false}
                        iconRight={icons.inputEdit}
                        onIconRightPress={onEditLastNamePress}
                    />
                    <InputField
                        label="Email"
                        placeholder="todo"
                        textContentType="emailAddress"
                        value={user?.emailAddresses[0].emailAddress}
                        editable={false}
                    />
                    <View>
                        <InputField
                            label="Email status"
                            placeholder="todo"
                            editable={false}
                            value={user?.hasVerifiedEmailAddress ? "Verified" : "Unverified"}
                        />
                        <View
                            className={`absolute px-2 bottom-[18px] left-4 rounded-full border-2 ${user?.hasVerifiedEmailAddress ? "bg-green-200 border border-green-600" : "bg-red-200 border-red-600"}`}>
                            <Text className={`px-2 py-1 font-JakartaBold text-base`}>
                                {user?.hasVerifiedEmailAddress ? "✓ Verified" : "⨉ Unverified"}
                            </Text>
                        </View>
                    </View>
                    <InputField
                        label="Phone number"
                        placeholder="No phone number found"
                        textContentType="telephoneNumber"
                        value={user?.phoneNumbers[0]?.phoneNumber.toString() || ""}
                        editable={false}
                    />
                </View>
                <ReactNativeModal
                    avoidKeyboard={true}
                    statusBarTranslucent={true}
                    isVisible={bottomSheetVisible}
                    onBackdropPress={() => setBottomSheetVisible(false)}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View className="bg-white px-7 py-9 rounded-2xl h-min">
                            <InputField
                                label={bottomSheetInputLabel}
                                value={bottomSheetInputValue}
                                onChangeText={(value) => setBottomSheetInputValue(value)}
                            />
                            <Button
                                title={"Save"}
                                className="mt-5 mb-2"
                                onPress={onBottomSheetSaveButtonPress}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </ReactNativeModal>
            </ScrollView>
        </SafeAreaView>
    );
}
