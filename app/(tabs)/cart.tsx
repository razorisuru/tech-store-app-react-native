import { useCart } from "@/context/CartContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const [promoInput, setPromoInput] = useState("");
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#94a3b8" : "#475569";
  const placeholderColor = colorScheme === "dark" ? "#64748b" : "#94a3b8";
  const {
    items,
    itemCount,
    subtotal,
    shipping,
    discount,
    total,
    promoCode,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
    clearCart,
  } = useCart();

  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
  };

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      const success = applyPromoCode(promoInput);
      if (success) {
        setPromoInput("");
        Alert.alert("Success", "Promo code applied successfully!");
      } else {
        Alert.alert("Invalid Code", "This promo code is not valid. Try: WELCOME10, RAZOR20, or TECH15");
      }
    }
  };

  const handleCheckout = () => {
    Alert.alert(
      "Checkout",
      `Your order total is ${formatPrice(total)}. This is a demo app.`,
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-border">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center -ml-2"
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios-new" size={20} color={iconColor} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-foreground">Shopping Cart</Text>
        <View className="w-10" />
      </View>

      {items.length === 0 ? (
        // Empty Cart
        <View className="flex-1 items-center justify-center px-8">
          <MaterialIcons name="shopping-cart" size={80} color={placeholderColor} />
          <Text className="text-foreground text-xl font-bold mt-6">Your cart is empty</Text>
          <Text className="text-muted text-center mt-2">
            Looks like you haven't added anything to your cart yet.
          </Text>
          <TouchableOpacity
            className="mt-8 bg-deep-twilight-500 px-8 py-4 rounded-2xl"
            onPress={() => router.push("/(tabs)/search")}
          >
            <Text className="text-white font-bold">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
            {/* Step Indicator */}
            <View className="flex-row items-center justify-between px-4 py-4 mt-2">
              <View className="items-center">
                <View className="w-8 h-8 rounded-full bg-deep-twilight-500 items-center justify-center ring-4 ring-deep-twilight-900/30">
                  <Text className="text-white text-xs font-bold">1</Text>
                </View>
                <Text className="text-[10px] font-medium text-deep-twilight-400 mt-1">Cart</Text>
              </View>
              <View className="flex-1 h-[1px] bg-border mx-2 mb-4" />
              <View className="items-center opacity-40">
                <View className="w-8 h-8 rounded-full bg-muted items-center justify-center">
                  <Text className="text-inverse text-xs font-bold">2</Text>
                </View>
                <Text className="text-[10px] font-medium text-foreground mt-1">Shipping</Text>
              </View>
              <View className="flex-1 h-[1px] bg-border mx-2 mb-4" />
              <View className="items-center opacity-40">
                <View className="w-8 h-8 rounded-full bg-muted items-center justify-center">
                  <Text className="text-inverse text-xs font-bold">3</Text>
                </View>
                <Text className="text-[10px] font-medium text-foreground mt-1">Payment</Text>
              </View>
            </View>

            {/* Items Header */}
            <View className="flex-row items-center justify-between mb-2 mt-4">
              <Text className="text-sm font-semibold text-muted uppercase tracking-wider">
                Items ({itemCount})
              </Text>
              <TouchableOpacity onPress={clearCart}>
                <Text className="text-deep-twilight-400 text-sm font-medium">Clear All</Text>
              </TouchableOpacity>
            </View>

            {/* Cart Items */}
            <View className="gap-4 mt-2">
              {items.map((item) => (
                <View
                  key={item.product.id}
                  className="flex-row gap-4 p-4 bg-card rounded-2xl border border-border"
                >
                  {/* Product Image */}
                  <View className="w-24 h-24 bg-muted/20 rounded-xl overflow-hidden">
                    <Image
                      source={{ uri: item.product.image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>

                  {/* Product Details */}
                  <View className="flex-1 justify-between">
                    <View>
                      <View className="flex-row justify-between items-start">
                        <Text className="font-bold text-sm text-foreground flex-1 pr-2" numberOfLines={2}>
                          {item.product.name}
                        </Text>
                        <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
                          <MaterialIcons name="close" size={20} color={placeholderColor} />
                        </TouchableOpacity>
                      </View>
                      <Text className="text-xs text-muted mt-1">
                        {item.product.specs?.Color || item.product.brand}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between mt-3">
                      <Text className="font-bold text-deep-twilight-400">
                        {formatPrice(item.product.price)}
                      </Text>
                      {/* Quantity Controls */}
                      <View className="flex-row items-center bg-muted/20 rounded-lg p-1">
                        <TouchableOpacity
                          className="w-7 h-7 items-center justify-center"
                          onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <MaterialIcons name="remove" size={16} color={iconColor} />
                        </TouchableOpacity>
                        <Text className="w-8 text-center text-sm font-bold text-foreground">
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          className="w-7 h-7 items-center justify-center"
                          onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <MaterialIcons name="add" size={16} color={iconColor} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Promo Code */}
            <View className="mt-6">
              <Text className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
                Promo Code
              </Text>
              <View className="flex-row gap-2">
                <View className="flex-1 h-12 bg-card rounded-xl border border-border px-4 justify-center">
                  <TextInput
                    className="text-foreground text-sm"
                    placeholder="Enter code"
                    placeholderTextColor={placeholderColor}
                    value={promoInput}
                    onChangeText={setPromoInput}
                    autoCapitalize="characters"
                  />
                </View>
                <TouchableOpacity
                  className="px-6 h-12 bg-foreground rounded-xl items-center justify-center"
                  onPress={handleApplyPromo}
                >
                  <Text className="text-background font-bold text-sm">Apply</Text>
                </TouchableOpacity>
              </View>
              {promoCode && (
                <View className="flex-row items-center justify-between mt-2 px-2">
                  <Text className="text-green-500 text-xs">
                    ✓ Code {promoCode} applied
                  </Text>
                  <TouchableOpacity onPress={removePromoCode}>
                    <Text className="text-red-500 text-xs">Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Order Summary */}
            <View className="mt-6 p-5 bg-card rounded-2xl border border-border">
              <View className="flex-row justify-between mb-3">
                <Text className="text-sm text-muted">Subtotal</Text>
                <Text className="text-sm font-semibold text-foreground">{formatPrice(subtotal)}</Text>
              </View>
              <View className="flex-row justify-between mb-3">
                <Text className="text-sm text-muted">Shipping</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </Text>
              </View>
              {discount > 0 && (
                <View className="flex-row justify-between mb-3">
                  <Text className="text-sm text-muted">Discount ({promoCode})</Text>
                  <Text className="text-sm font-semibold text-green-500">
                    - {formatPrice(discount)}
                  </Text>
                </View>
              )}
              <View className="h-[1px] bg-border my-3" />
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-bold text-foreground">Total Amount</Text>
                <Text className="text-xl font-extrabold text-deep-twilight-400">
                  {formatPrice(total)}
                </Text>
              </View>
            </View>

            <View className="h-32" />
          </ScrollView>

          {/* Checkout Button */}
          <View className="absolute bottom-0 left-0 right-0 px-5 pt-4 pb-6 bg-background border-t border-border">
            <TouchableOpacity
              className="w-full py-4 bg-deep-twilight-500 rounded-2xl flex-row items-center justify-center"
              onPress={handleCheckout}
            >
              <Text className="text-white font-bold mr-2">Proceed to Checkout</Text>
              <MaterialIcons name="arrow-forward" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
