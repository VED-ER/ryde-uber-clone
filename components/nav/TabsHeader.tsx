import { Text, View } from "react-native";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/nav/SignOutButton";

export default function TabsHeader({
    title,
    HeaderRight,
}: {
    title?: string;
    HeaderRight?: ReactNode;
}) {
    return (
        <View className="flex w-full flex-row items-center justify-between my-5">
            <Text className="text-2xl font-JakartaExtraBold">{title}</Text>
            {HeaderRight ? HeaderRight : <SignOutButton />}
        </View>
    );
}
