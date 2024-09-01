import { doSignOut } from "@/lib/auth";
import { Image } from "expo-image";
import { icons } from "@/constants";
import { TouchableOpacity } from "react-native";

export default function SignOutButton() {
    return (
        <TouchableOpacity
            onPress={doSignOut}
            className="justify-center items-center w-10 h-10 rounded-full bg-white">
            <Image source={icons.out} className="w-4 h-4" />
        </TouchableOpacity>
    );
}
