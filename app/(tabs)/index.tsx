import { View, Text, StatusBar } from "react-native";

export default function HomeScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-red-500 text-2xl max-w-xs text-center">
                Open up App.js to start working on your app!
            </Text>
            <StatusBar barStyle={"light-content"} />
        </View>
    );
}
