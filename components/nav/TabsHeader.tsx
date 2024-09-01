import { Text, View } from "react-native";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/nav/SignOutButton";
import { className } from "postcss-selector-parser";

export default function TabsHeader({
    title,
    HeaderRight,
    containerStyle,
}: {
    title?: string;
    HeaderRight?: ReactNode;
    containerStyle?: string;
}) {
    return (
        <View
            className={`flex w-full flex-row items-center justify-between my-5 ${containerStyle}`}>
            <Text className="text-2xl font-JakartaExtraBold">{title}</Text>
            {HeaderRight ? HeaderRight : <SignOutButton />}
        </View>
    );
}
