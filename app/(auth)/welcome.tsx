import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import Button from "@/components/Button";
import { rotate } from "nativewind/dist/tailwind/native/rotate";

export default function Welcome() {
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;
    const router = useRouter();

    const swiperRef = useRef<Swiper | null>(null);

    const onSkipPress = () => {
        router.replace("/(auth)/sign-up");
    };

    const onNextButtonPress = () => {
        if (isLastSlide) {
            router.replace("/(auth)/sign-up");
        } else {
            swiperRef.current?.scrollBy(1);
        }
    };

    return (
        <SafeAreaView className="flex h-full items-center justify-between bg-white">
            <TouchableOpacity
                onPress={onSkipPress}
                className="ml-auto flex justify-end items-end p-5">
                <Text className="text-black text-md font-JakartaBold">Skip</Text>
            </TouchableOpacity>

            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />}
                activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />}
                onIndexChanged={(index) => setActiveIndex(index)}>
                {onboarding.map((item) => (
                    <View className="flex items-center justify-center p-5" key={item.id}>
                        <Image
                            source={item.image}
                            className="w-full h-[300px]"
                            resizeMode={"contain"}
                        />
                        <View className="flex flex-row items-center justify-center w-full mt-10">
                            <Text className="text-black text-3xl font-bold mx-10 text-center">
                                {item.title}
                            </Text>
                        </View>
                        <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
                            {item.description}
                        </Text>
                    </View>
                ))}
            </Swiper>
            <Button
                onPress={onNextButtonPress}
                title={isLastSlide ? "Get Started" : "Next"}
                className={"w-11/12 mt-10"}
            />
        </SafeAreaView>
    );
}
