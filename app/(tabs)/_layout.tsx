import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        headerShown: false,
        tabBarActiveTintColor: "#323232",
        tabBarStyle: { elevation: 0, borderTopWidth: 0 },
      }}
    >
      <Tabs.Screen
        name="camera"
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="camera" color="#323232" />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color="#323232" />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: "Gallery",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="image" color="#323232" />
          ),
        }}
      />
    </Tabs>
  );
}
