import { Alert, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import Button from "@/components/Button";
import OAuth from "@/components/OAuth";
import { Link, useRouter } from "expo-router";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { useCallback, useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";

export default function SignIn() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            });

            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace("/(root)/(tabs)/home");
            } else {
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.log("1");
                // Alert.alert('Error', signInAttempt.)
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err: any) {
            console.log("2");
            console.error(JSON.stringify(err, null, 2));
        }
    }, [isLoaded, form.email, form.password]);

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Welcome 👋
                    </Text>
                </View>

                <View className="p-5">
                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        icon={icons.email}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />

                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        icon={icons.lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />

                    <Button title="Sign In" onPress={onSignInPress} className="mt-6" />

                    <OAuth />

                    <Link href="/sign-up" className="text-lg text-center text-general-200 mt-10">
                        Don't have an account? <Text className="text-primary-500">Sign Up</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
}
