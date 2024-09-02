import { Alert, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import Button from "@/components/Button";
import OAuth from "@/components/OAuth";
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

export default function SignUp() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const onSignUpPress = async () => {
        if (!isLoaded) {
            return;
        }

        const [firstName, lastName] = form.name.split(" ");

        if (!firstName || !lastName) {
            Alert.alert("Error", `Please enter a valid name in format: "John Smith"`);
            return;
        }

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress: form.email,
                password: form.password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            setVerification({ ...verification, state: "pending" });
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            // console.error(JSON.stringify(err, null, 2));
            Alert.alert("Error", err.errors[0].longMessage);
        }
    };

    const onPressVerify = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });

            if (completeSignUp.status === "complete") {
                // here clerk user is created
                // TODO: Create a db user
                await fetchAPI("/(api)/user", {
                    method: "POST",
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        clerkId: completeSignUp.createdUserId,
                    }),
                });
                await setActive({ session: completeSignUp.createdSessionId });
                setVerification({ ...verification, state: "success" });
                // router.replace("/");
            } else {
                setVerification({ ...verification, state: "failed", error: "Verification failed" });
                console.error(JSON.stringify(completeSignUp, null, 2));
            }
        } catch (err: any) {
            setVerification({ ...verification, state: "failed", error: err.errors[0].longMessage });
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Create Your Account
                    </Text>
                </View>
                <View className="p-5">
                    <InputField
                        label="Name"
                        placeholder="John Smith"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) => setForm({ ...form, name: value })}
                    />
                    <InputField
                        label="Email"
                        placeholder="johnsmith@gmail.com"
                        icon={icons.email}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />
                    <InputField
                        label="Password"
                        placeholder="********"
                        icon={icons.lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />
                    <Button title="Sign Up" onPress={onSignUpPress} className="mt-6" />
                    <OAuth />
                    <Link href="/sign-in" className="text-lg text-center text-general-200 mt-10">
                        Already have an account? <Text className="text-primary-500">Log In</Text>
                    </Link>
                </View>

                <ReactNativeModal
                    isVisible={verification.state === "pending"}
                    onModalHide={() => {
                        if (verification.state === "success") setShowSuccessModal(true);
                    }}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Text className="text-2xl font-JakartaExtraBold mb-2 text-center">
                            Verification
                        </Text>
                        <Text className="text-base text-gray-400 font-Jakarta text-center mb-5">
                            We've sent a verification code to {form.email}
                        </Text>

                        <InputField
                            label={"Code"}
                            icon={icons.lock}
                            placeholder={"123456"}
                            value={verification.code}
                            keyboardType={"numeric"}
                            onChangeText={(code) => setVerification({ ...verification, code })}
                        />
                        {verification.error && (
                            <Text className="text-red-500 text-sm mt-1 text-center">
                                {verification.error}
                            </Text>
                        )}
                        <Button
                            title={"Verify email"}
                            onPress={onPressVerify}
                            className="mt-5 bg-success-500"
                        />
                    </View>
                </ReactNativeModal>
                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
                        <Text className="text-3xl font-JakartaBold text-center">Verified</Text>
                        <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                            You have successfully verified your account.
                        </Text>

                        <Button
                            onPress={() => {
                                setShowSuccessModal(false);
                                router.push("/(root)/(tabs)/home");
                            }}
                            title={"Browse home"}
                            className="mt-5"
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    );
}
