import { Text, View } from "react-native";
import { Image } from "expo-image";
import { icons } from "@/constants";
import Button from "@/components/Button";
import { useCallback } from "react";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { fetchAPI } from "@/lib/fetch";
import { router } from "expo-router";

const OAuth = () => {
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const handleGoogleSignIn = useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL("/(root)/(tabs)/home", { scheme: "myapp" }),
            });

            if (createdSessionId) {
                if (setActive) {
                    await setActive({ session: createdSessionId });

                    if (signUp?.createdUserId) {
                        await fetchAPI("/(api)/user", {
                            method: "POST",
                            body: JSON.stringify({
                                name: `${signUp.firstName} ${signUp.lastName}`,
                                email: signUp.emailAddress,
                                clerkId: signUp.createdUserId,
                            }),
                        });
                    }
                    // redirect URL not working so must redirect manually with router
                    router.replace("/(root)/(tabs)/home");
                }
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
                <View className="flex-1 h-[1px] bg-general-100" />
                <Text className="text-lg">Or</Text>
                <View className="flex-1 h-[1px] bg-general-100" />
            </View>

            <Button
                title="Log In with Google"
                className="mt-5 w-full shadow-none"
                IconLeft={() => (
                    <Image source={icons.google} contentFit="contain" className="w-5 h-5 mx-2" />
                )}
                bgVariant="outline"
                textVariant="primary"
                onPress={handleGoogleSignIn}
            />
        </View>
    );
};

export default OAuth;
