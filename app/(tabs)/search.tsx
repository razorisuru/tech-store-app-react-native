import { useCart } from "@/context/CartContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Product } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import productsData from "@/api/products.json";

const FILTERS = ["Brand", "Price", "Storage", "RAM"];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Brand");
  const router = useRouter();
  const { addToCart } = useCart();
  const { colorScheme } = useColorScheme();
  const placeholderColor = colorScheme === "dark" ? "#64748b" : "#94a3b8";

  const products = (productsData as unknown as { products: Product[] }).products;

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }, [searchQuery, products]);

  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString()}`;
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center"
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back-ios-new" size={20} color="#080cf7" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-foreground">RaZoR Tech</Text>
          <TouchableOpacity className="w-10 h-10 items-center justify-center relative">
            <MaterialIcons name="tune" size={24} color="#080cf7" />
            <View className="absolute top-1 right-1 w-4 h-4 bg-deep-twilight-500 rounded-full items-center justify-center">
              <Text className="text-white text-[10px] font-bold">3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center h-12 bg-card rounded-xl border border-border overflow-hidden">
          <View className="pl-4">
            <MaterialIcons name="search" size={20} color="#080cf7" />
          </View>
          <TextInput
            className="flex-1 px-4 text-base text-foreground font-medium"
            placeholder="Search products..."
            placeholderTextColor={placeholderColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity className="pr-4" onPress={() => setSearchQuery("")}>
              <MaterialIcons name="cancel" size={20} color={placeholderColor} />
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 16, gap: 8 }}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              className={`flex-row items-center gap-2 px-4 h-9 rounded-full ${
                activeFilter === filter
                  ? "bg-deep-twilight-500"
                  : "bg-card border border-border"
              }`}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                className={`text-sm font-semibold ${
                  activeFilter === filter ? "text-white" : "text-muted"
                }`}
              >
                {filter}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={16}
                color={activeFilter === filter ? "white" : placeholderColor}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View className="px-4 py-2">
        <Text className="text-muted text-sm">
          {filteredProducts.length} results found
        </Text>
      </View>

      {/* Product List */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="gap-4 pb-4">
          {filteredProducts.map((product) => (
            <View
              key={product.id}
              className="flex-row gap-4 p-4 bg-card rounded-2xl border border-border"
            >
              {/* Product Image */}
              <View className="w-28 h-28 bg-muted/20 rounded-xl overflow-hidden items-center justify-center">
                <Image
                  source={{ uri: product.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Product Details */}
              <View className="flex-1 justify-between">
                <View>
                  <View className="flex-row justify-between items-start">
                    <Text className="text-deep-twilight-400 text-[10px] font-bold uppercase tracking-widest">
                      {product.brand}
                    </Text>
                    <View className="flex-row items-center gap-1">
                      <MaterialIcons name="star" size={14} color="#f59e0b" />
                      <Text className="text-xs font-bold text-muted">
                        {product.rating}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-base font-bold text-foreground mt-1" numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text className="text-muted text-xs mt-1" numberOfLines={1}>
                    {product.description}
                  </Text>
                </View>

                <View className="flex-row items-end justify-between mt-4">
                  <Text className="text-xl font-bold text-deep-twilight-400">
                    {formatPrice(product.price)}
                  </Text>
                  <TouchableOpacity
                    className="bg-deep-twilight-500 w-10 h-10 rounded-full items-center justify-center"
                    onPress={() => handleAddToCart(product)}
                  >
                    <MaterialIcons name="add" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sort FAB */}
      <TouchableOpacity className="absolute bottom-6 right-6 flex-row items-center gap-2 h-14 px-6 bg-deep-twilight-500 rounded-full shadow-lg">
        <MaterialIcons name="sort" size={20} color="white" />
        <Text className="text-white font-bold">Sort By</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
