import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack, router, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import Colors from "@/constants/Colors";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();

  return (
    <AuthProvider>
      <QueryProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/reset"
            options={{
              title: "Reset your password",
              presentation: "fullScreenModal",
              headerTitleStyle: { fontFamily: "mon-sb" },
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="close-outline" size={28} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(modals)/editProfile"
            options={{
              title: "Edit your profile",
              headerTitleStyle: { fontFamily: "mon-sb" },
              presentation: "modal",
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="close-outline" size={28} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="listing/[id]"
            options={{
              headerTitle: "",
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="(modals)/filter"
            options={{
              headerTransparent: true,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="(modals)/ingredients"
            options={{
              title: `Ingredients`,
              headerTitleStyle: { fontFamily: "mon-sb" },
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='chevron-back' size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(modals)/instructions"
            options={{
              title: `Instructions`,
              headerTitleStyle: { fontFamily: "mon-sb" },
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='chevron-back' size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="search/[query]"
            options={{
              title: `Search`,
              headerTitleStyle: { fontFamily: "mon-sb" },
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='chevron-back' size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </QueryProvider>
    </AuthProvider>
  );
}
