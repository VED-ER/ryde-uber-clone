import { Tabs } from "expo-router";
import { ImageSourcePropType, Platform, View } from "react-native";
import { icons } from "@/constants";
import { Image } from "expo-image";
import { useKeyboardDidShow } from "@/hooks/useKeyboardDidShow";
import { useUser } from "@clerk/clerk-expo";

const TabIcon = ({ source, focused }: { source: ImageSourcePropType; focused: boolean }) => (
    <View
        className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}>
        <View
            className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}>
            <Image source={source} tintColor={"white"} contentFit={"contain"} className="w-7 h-7" />
        </View>
    </View>
);

export default function TabsLayout() {
    const keyboardShown = useKeyboardDidShow();
    return (
        <Tabs
            initialRouteName={"index"}
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#333333",
                    borderRadius: 50,
                    paddingBottom: 0,
                    overflow: "hidden",
                    marginHorizontal: 20,
                    marginBottom: Platform.OS === "android" && keyboardShown ? -100 : 20,
                    height: 78,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    position: "absolute",
                },
                headerShown: false,
            }}>
            <Tabs.Screen
                name={"home"}
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home} />,
                }}
            />
            <Tabs.Screen
                name={"history"}
                options={{
                    title: "History",
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.list} />,
                }}
            />
            <Tabs.Screen
                name={"chat"}
                options={{
                    title: "Chat",
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.chat} />,
                }}
            />
            <Tabs.Screen
                name={"profile"}
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} source={icons.profile} />
                    ),
                }}
            />
        </Tabs>
    );
}
