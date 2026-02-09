import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MENU_ITEMS = [
  {
    title: "Shopping Essentials",
    items: [
      { icon: "shopping-bag", label: "My Orders", description: "Track, return or buy again" },
      { icon: "favorite-border", label: "Wishlist", description: "Items you've saved for later" },
      { icon: "place", label: "Address Book", description: "Saved delivery locations" },
    ],
  },
  {
    title: "Settings & Support",
    items: [
      { icon: "payments", label: "Payment Methods", description: null },
      { icon: "support-agent", label: "Support Center", description: null },
      { icon: "help-outline", label: "FAQs", description: null },
    ],
  },
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const router = useRouter();
  const iconColor = colorScheme === "dark" ? "#94a3b8" : "#64748b";

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/signin");
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-border">
        <TouchableOpacity className="w-10 h-10 items-center justify-center -ml-2">
          <MaterialIcons name="arrow-back-ios" size={20} color={iconColor} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-foreground">Account</Text>
        <TouchableOpacity className="w-10 h-10 items-center justify-center -mr-2">
          <MaterialIcons name="settings" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View className="items-center py-8 px-5">
          <View className="relative mb-4">
            <View className="w-24 h-24 rounded-full border-4 border-border shadow-xl overflow-hidden bg-muted/20">
              {user?.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full items-center justify-center">
                  <MaterialIcons name="person" size={48} color={iconColor} />
                </View>
              )}
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 bg-deep-twilight-500 p-1.5 rounded-full border-2 border-background">
              <MaterialIcons name="edit" size={14} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-bold text-foreground">{user?.name || "Guest"}</Text>
          <Text className="text-muted text-sm font-medium mt-1">
            {user?.email || "Not signed in"}
          </Text>
          {user?.isVerified && (
            <View className="flex-row items-center mt-4 px-3 py-1 bg-french-blue-50/10 rounded-full">
              <MaterialIcons name="verified" size={14} color="#056efa" />
              <Text className="text-french-blue-400 text-xs font-bold uppercase tracking-wider ml-1">
                Verified Member
              </Text>
            </View>
          )}
        </View>

        {/* Stats Grid */}
        <View className="mx-5 mb-8">
          <View className="flex-row bg-card rounded-2xl p-4 border border-border">
            <View className="flex-1 items-center">
              <Text className="text-deep-twilight-400 font-bold text-lg">{user?.ordersCount || 0}</Text>
              <Text className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold mt-1">
                Orders
              </Text>
            </View>
            <View className="w-[1px] bg-slate-700" />
            <View className="flex-1 items-center">
              <Text className="text-deep-twilight-400 font-bold text-lg">{user?.wishlistCount || 0}</Text>
              <Text className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold mt-1">
                Wishlist
              </Text>
            </View>
            <View className="w-[1px] bg-slate-700" />
            <View className="flex-1 items-center">
              <Text className="text-deep-twilight-400 font-bold text-lg">{user?.points || 0}</Text>
              <Text className="text-[10px] uppercase tracking-wide text-muted font-semibold mt-1">
                Points
              </Text>
            </View>
          </View>
        </View>

        <View className="px-5 mb-6">
          <Text className="text-xs font-bold text-muted uppercase tracking-widest ml-1 mb-3">
            Appearance
          </Text>
          <View className="bg-card rounded-2xl overflow-hidden border border-border">
            <View className="flex-row items-center justify-between px-4 py-3">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-deep-twilight-500/10 items-center justify-center">
                  <MaterialIcons name="dark-mode" size={20} color="#080cf7" />
                </View>
                <View>
                  <Text className="font-semibold text-sm text-foreground ml-4">Dark Mode ({colorScheme})</Text>
                </View>
              </View>
              <Switch
                value={colorScheme === "dark"}
                onValueChange={toggleColorScheme}
                trackColor={{ false: "#334155", true: "#080cf7" }}
                thumbColor={colorScheme === "dark" ? "#ffffff" : "#f4f3f4"}
              />
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        {MENU_ITEMS.map((section) => (
          <View className="px-5 mb-6">
            <Text className="text-xs font-bold text-muted uppercase tracking-widest ml-1 mb-3">
              {section.title}
            </Text>
            <View className="bg-card rounded-2xl overflow-hidden border border-border">
              {section.items.map((item, index) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity className="flex-row items-center px-4 py-4">
                    <View className="w-10 h-10 rounded-full bg-french-blue-50/10 items-center justify-center">
                      <MaterialIcons
                        name={item.icon as keyof typeof MaterialIcons.glyphMap}
                        size={20}
                        color="#056efa"
                      />
                    </View>
                    <View className="flex-1 ml-4">
                      <Text className="font-semibold text-sm text-foreground">{item.label}</Text>
                      {item.description && (
                        <Text className="text-xs text-muted mt-0.5">{item.description}</Text>
                      )}
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color={iconColor} />
                  </TouchableOpacity>
                  {index < section.items.length - 1 && (
                    <View className="h-[1px] bg-border mx-4" />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Gift Voucher Banner */}
        <View className="mx-5 mb-8">
          <View className="bg-deep-twilight-500 rounded-2xl p-5 relative overflow-hidden">
            <View className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <View className="absolute -bottom-10 -left-10 w-24 h-24 bg-deep-twilight-900/20 rounded-full blur-xl" />
            <View className="z-10">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <MaterialIcons name="card-giftcard" size={20} color="white" />
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-white ml-2">
                    RaZoR Tech Exclusive
                  </Text>
                </View>
                <View className="bg-white/20 px-2 py-0.5 rounded">
                  <Text className="text-[10px] font-mono text-white">CODE: RAZOR2024</Text>
                </View>
              </View>
              <Text className="text-xl font-black text-white mb-1">E-GIFT VOUCHERS</Text>
              <Text className="text-sm text-white/80 mb-6 max-w-[200px]">
                The perfect tech gift for your loved ones. Instant delivery.
              </Text>
              <TouchableOpacity className="bg-white py-2.5 px-6 rounded-lg self-start">
                <Text className="text-deep-twilight-500 font-bold text-sm">Shop Vouchers</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-5 mb-8">
          <TouchableOpacity
            className="w-full py-4 bg-card rounded-2xl flex-row items-center justify-center border border-border"
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={20} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-2">Logout</Text>
          </TouchableOpacity>
          <Text className="text-center text-[11px] text-muted mt-6">
            RaZoR Tech App Version 1.0.1 (Build 1)
          </Text>
        </View>

        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
}
