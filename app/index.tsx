import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import * as SplashScreen from "expo-splash-screen";

export default function Home() {
    const { isSignedIn, isLoaded } = useAuth();

    if (isLoaded) {
        // have to use setTimeout because of split second flash of rendering
        setTimeout(() => {
            SplashScreen.hideAsync();
        }, 100);
    }

    if (isSignedIn) {
        return <Redirect href={"/(root)/(tabs)/home"} />;
    }
    return <Redirect href="/(auth)/welcome" />;
}
