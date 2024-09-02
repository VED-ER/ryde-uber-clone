import { Image } from "expo-image";
import { icons } from "@/constants";
import { Platform, TouchableOpacity, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function SignOutButton() {
    const { signOut } = useAuth();

    const doSignOut = () => {
        signOut();
        router.replace("/(auth)/sign-in");
    };
    return (
        <TouchableOpacity onPress={doSignOut}>
            <View
                style={{ elevation: 10 }}
                className={`justify-center items-center w-10 h-10 rounded-full bg-white ${Platform.OS !== "android" ? "shadow-sm shadow-neutral-400/70" : ""}`}>
                <Image source={icons.out} className="w-4 h-4" />
            </View>
        </TouchableOpacity>
    );
}
