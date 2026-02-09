import { useCart } from "@/context/CartContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

type TabIconProps = {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  focused: boolean;
  badge?: number;
};

function TabIcon({ name, color, focused, badge }: TabIconProps) {
  return (
    <View className="items-center justify-center relative">
      <MaterialIcons name={name} size={24} color={color} />
      {badge && badge > 0 && (
        <View className="absolute -top-1 -right-2 bg-red-500 rounded-full min-w-[16px] h-4 items-center justify-center px-1">
          <Text className="text-white text-[10px] font-bold">{badge > 9 ? "9+" : badge}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  const { itemCount } = useCart();
  const { colorScheme } = useColorScheme();

  const tabBarBg = colorScheme === "dark" ? "#1e293b" : "#ffffff"; // bg-card
  const tabBarBorder = colorScheme === "dark" ? "#334155" : "#e2e8f0"; // border-border
  const inactiveTintColor = colorScheme === "dark" ? "#94a3b8" : "#64748b"; // text-muted

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#080cf7",
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopColor: tabBarBorder,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="search" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="shopping-cart" color={color} focused={focused} badge={itemCount} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
