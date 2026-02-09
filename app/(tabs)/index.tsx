import { useCart } from "@/context/CartContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Category, Product } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import mock data
import categoriesData from "@/api/categories.json";
import productsData from "@/api/products.json";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { addToCart, itemCount } = useCart();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#94a3b8" : "#475569";

  const products = (productsData as unknown as { products: Product[] }).products;
  const categories = (categoriesData as unknown as { categories: Category[] }).categories;

  const trendingProducts = products.filter((p) => p.isTrending);
  const newProducts = products.filter((p) => p.isNew);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString()}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-border">
        <TouchableOpacity className="p-2 -ml-2">
          <MaterialIcons name="menu" size={24} color={iconColor} />
        </TouchableOpacity>
        <View className="flex-1 items-center flex-row justify-center">
          <Text className="text-xl font-bold tracking-tight text-deep-twilight-400">RaZoR</Text>
          <Text className="text-xl font-bold tracking-tight text-foreground ml-1">Tech</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="p-2" onPress={() => router.push("/(tabs)/search")}>
            <MaterialIcons name="search" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 relative" onPress={() => router.push("/(tabs)/cart")}>
            <MaterialIcons name="shopping-bag" size={24} color={iconColor} />
            {itemCount > 0 ? (
              <View className="absolute top-1 right-1 bg-deep-twilight-500 rounded-full w-4 h-4 items-center justify-center">
                <Text className="text-white text-[8px] font-bold">{itemCount}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Promo Banner */}
        <View className="bg-deep-twilight-500/20 py-2 px-4 flex-row items-center justify-center gap-2">
          <MaterialIcons name="local-shipping" size={16} color="#080cf7" />
          <Text className="text-deep-twilight-400 text-xs font-bold uppercase tracking-widest">
            Free Priority Shipping on orders over Rs 9,900
          </Text>
        </View>

        {/* Hero Banner */}
        <View className="mx-4 mt-4">
          <View className="h-96 rounded-4xl overflow-hidden relative">
            <Image
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZEGkdtjAX2FjAecipcFTbXYyK4tps8pQBDAoicafu2pnC3SwwElT9vzRsBtqMon9KZJt7aTZgxVgh-_0d4dFbZCaJCr8lQ3-ShzdBlH9I0k_-kF5qhWm2AbIW03P8O5AxQWe34JkIJD4s_KyhmJJcm95F3svSxlVVZKm5OQzeyqvj9FMWy7mrAmP2rqTiBspTFysvflXrAi1ZdBdbHmCx14Z0-dTmM3mHT-onH2u8C_RIYVsv6NmvOCLD0qiwGw0iXgKcTlJ5p89M" }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent justify-end p-8">
              <Text className="text-white text-3xl font-bold leading-tight mb-2">
                Smart Home{"\n"}Security Cameras
              </Text>
              <Text className="text-white/80 text-sm mb-6 max-w-[200px]">
                Keep an eye on what matters most, from anywhere.
              </Text>
              <TouchableOpacity className="bg-deep-twilight-500 px-8 py-3 rounded-full self-start">
                <Text className="text-white font-bold">Shop Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Explore Collections */}
        <View className="mt-8">
          <Text className="text-lg font-bold text-foreground px-4 mb-4">
            Explore Collections
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                className={`flex-row items-center gap-2 px-4 py-3 rounded-2xl ${
                  index === 0
                    ? "bg-deep-twilight-500"
                    : "bg-card border border-border"
                }`}
              >
                <MaterialIcons
                  name={category.icon as keyof typeof MaterialIcons.glyphMap}
                  size={18}
                  color={index === 0 ? "white" : "#080cf7"}
                />
                <Text
                  className={`text-sm font-semibold ${
                    index === 0 ? "text-white" : "text-foreground"
                  }`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending for You */}
        <View className="mt-10">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <View>
              <View className="flex-row items-center gap-1.5">
                <MaterialIcons name="auto-awesome" size={20} color="#080cf7" />
                <Text className="text-lg font-bold text-foreground">Trending for You</Text>
              </View>
              <Text className="text-[10px] text-muted uppercase font-bold tracking-wider mt-1">
                Based on your preferences
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-deep-twilight-400 text-xs font-bold uppercase">
                Personalize
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
          >
            {trendingProducts.slice(0, 4).map((product) => (
              <View
                key={product.id}
                className="w-60 bg-gradient-to-br from-deep-twilight-500/10 to-transparent p-1 rounded-3xl"
              >
                <View className="bg-card rounded-[20px] p-4 border border-border">
                  <View className="aspect-video bg-muted/20 rounded-xl mb-3 overflow-hidden">
                    <Image
                      source={{ uri: product.image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                  <Text className="font-bold text-sm text-foreground mb-1" numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text className="text-xs text-muted mb-2" numberOfLines={1}>
                    {product.description}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-deep-twilight-400 font-bold">
                      {formatPrice(product.price)}
                    </Text>
                    <TouchableOpacity
                      className="bg-deep-twilight-500/20 p-2 rounded-full"
                      onPress={() => handleAddToCart(product)}
                    >
                      <MaterialIcons name="bolt" size={20} color="#080cf7" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* New Arrivals */}
        <View className="mt-10">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <View>
              <Text className="text-lg font-bold text-foreground">New Arrivals</Text>
              <View className="h-1 w-8 bg-deep-twilight-500 rounded-full mt-1" />
            </View>
            <TouchableOpacity>
              <Text className="text-deep-twilight-400 text-xs font-bold uppercase tracking-wider">
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
          >
            {newProducts.map((product) => (
              <View
                key={product.id}
                className="w-44 bg-card rounded-3xl p-4 border border-border"
              >
                <View className="relative aspect-square mb-3 bg-muted/20 rounded-2xl overflow-hidden p-3">
                  <Image
                    source={{ uri: product.image }}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                  {product.isNew && (
                    <View className="absolute top-2 left-2 bg-red-500 px-2 py-0.5 rounded-full">
                      <Text className="text-white text-[8px] font-black uppercase">
                        New
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    className="absolute bottom-2 right-2 bg-deep-twilight-500 w-9 h-9 rounded-full items-center justify-center"
                    onPress={() => handleAddToCart(product)}
                  >
                    <MaterialIcons name="bolt" size={20} color="white" />
                  </TouchableOpacity>
                </View>
                <Text className="text-xs font-semibold text-foreground mb-1" numberOfLines={2}>
                  {product.name}
                </Text>
                <Text className="text-deep-twilight-400 font-bold text-sm">
                  {formatPrice(product.price)}
                </Text>
                <View className="flex-row items-center gap-1 mt-2">
                  <View
                    className={`w-1.5 h-1.5 rounded-full ${
                      product.inStock ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <Text
                    className={`text-[9px] font-bold uppercase ${
                      product.inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "In stock" : "Sold out"}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Popular Categories */}
        <View className="mt-14 px-4">
          <Text className="text-xl font-bold text-center text-foreground mb-8">
            Popular <Text className="text-deep-twilight-400">Categories</Text>
          </Text>
          <View className="flex-row gap-4">
            <TouchableOpacity className="flex-1 aspect-[4/5] rounded-4xl overflow-hidden">
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAF8vfBOJO9imGd6_hYzfZFXpu1-P4LHp4S9WEug7trkb4pMOTYOTNNTn7P2PYVYNZszfgwiFkvi4JyNUEQo23ikTUDL-fn3uV2LRd8bMDqC85R3Wy9VmG-6UcJ7vcsVX4RPtJBly4QUrFp-teD5kx9YHyIaEMSzWQ4UY7v7vq4GVKBuGv38j3MxQPmY3OLPGlK-PfMxq2VY3urNGY1lB-Wj-F9adJJq1gIOTwaFRfmC3o2ePhiYQ_vw8KbouJnWaZMcD7GeQ-PZQFj" }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent items-center justify-end pb-8">
                <Text className="text-white text-xl font-bold">Apple</Text>
                <Text className="text-white/70 text-xs font-medium uppercase tracking-widest mt-1">
                  Explore
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 aspect-[4/5] rounded-4xl overflow-hidden">
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdASCuEgajE5rlaRMCEGiXe9AkE7DhQ5Ap5-TBWGDMSwIsdC2r_Ik6bubo9KMqbjDhF9sT5s_V_2vCNdfbID32WPnPLg7MqcZBT68tJHbT_5Ts_j2-xw-BLM852kiJY80zSb0_qJDVpnYtNQsAW2MlNTQS2m2ZAzwN1wHmWFYAhUis9Wlh9ubZ2igPaZnnWfb4gbWX6fAiqVlOhBFPhWQ8QKZ3tzowJQr94w_kgAkhp-rlL7NTSqSk7NeU90fHoQIeJfQaWYoIiZXR" }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent items-center justify-end pb-8">
                <Text className="text-white text-xl font-bold">Audio</Text>
                <Text className="text-white/70 text-xs font-medium uppercase tracking-widest mt-1">
                  Explore
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Flagship Store Banner */}
        <View className="mt-10 px-4">
          <View className="bg-card rounded-4xl p-8 relative overflow-hidden border border-border">
            <View className="absolute top-0 right-0 w-32 h-32 bg-deep-twilight-500/10 rounded-full blur-3xl" />
            <Text className="text-2xl font-bold text-foreground text-center mb-3 z-10">
              RaZoR Tech Flagship Store
            </Text>
            <Text className="text-muted text-sm text-center mb-6 max-w-[240px] mx-auto z-10">
              Visit our experience center for hands-on tech demos.
            </Text>
            <TouchableOpacity className="bg-foreground py-3 px-8 rounded-full self-center">
              <Text className="text-background font-bold text-sm">Get Directions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom padding */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
