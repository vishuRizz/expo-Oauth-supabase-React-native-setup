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
     <Text className="text-3xl font-rubik font-bold mb-20">Welcome</Text>
     <Link href="/signup">Sign up</Link>
     <Link href="/profile">profile</Link>

    </View>
  );
}
