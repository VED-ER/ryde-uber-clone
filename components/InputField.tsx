import {
    TextInput,
    View,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { InputFieldProps } from "@/types/type";

export default function InputField({
    label,
    icon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    iconRight,
    onIconRightPress,
    ...props
}: InputFieldProps) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="my-2 w-full">
                    <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
                        {label}
                    </Text>
                    <View
                        className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500  ${containerStyle}`}>
                        {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />}
                        <TextInput
                            className={`rounded-full p-4 text-black font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
                            secureTextEntry={secureTextEntry}
                            placeholderTextColor={"#7c7c7c"}
                            {...props}
                        />
                        {iconRight ? (
                            <TouchableOpacity onPress={onIconRightPress} className="mr-4">
                                <Image source={iconRight} className={`w-6 h-6 ml-4`} />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
