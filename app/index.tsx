import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     <Text className="text-3xl font-bold">Real Estate App</Text>
     <Link href="/sign-in">Sign-in</Link>
     <Link href="/explore">Explore</Link>
     <Link href="/profile">profile</Link>
     <Link href="/properties/2">Property</Link>
    </View>
  );
}
