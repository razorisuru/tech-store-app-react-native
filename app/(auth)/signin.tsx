import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { login, isLoading } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#94a3b8" : "#475569";
  const placeholderColor = colorScheme === "dark" ? "#64748b" : "#94a3b8";
  const inputBorderColor = colorScheme === "dark" ? "#334155" : "#e2e8f0";

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    // if (!validate()) return;

    // const success = await login(email, password);
    const success = await login("demo@razortech.com", "password123");
    
    if (success) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Login Failed", "Invalid email or password. Try demo@razortech.com / demo123");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-8 pb-6">
            {/* Logo & Header */}
            <View className="items-center mb-10">
              <View className="w-20 h-20 rounded-3xl bg-deep-twilight-500 items-center justify-center mb-4 shadow-lg">
                <MaterialIcons name="bolt" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-foreground tracking-tight">
                RaZoR <Text className="text-deep-twilight-400">Tech</Text>
              </Text>
              <Text className="text-muted text-sm mt-2">
                Premium Tech Store
              </Text>
            </View>

            {/* Welcome Text */}
            <View className="mb-8">
              <Text className="text-2xl font-bold text-foreground mb-2">
                Welcome Back
              </Text>
              <Text className="text-muted">
                Sign in to continue shopping
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
              {/* Email Input */}
              <View>
                <Text className="text-muted text-sm font-medium mb-2 ml-1">
                  Email Address
                </Text>
                <View className={`flex-row items-center bg-card rounded-2xl px-4 border ${errors.email ? "border-red-500" : "border-border"}`}>
                  <MaterialIcons name="email" size={20} color={iconColor} />
                  <TextInput
                    className="flex-1 py-4 px-3 text-foreground text-base"
                    placeholder="Enter your email"
                    placeholderTextColor={placeholderColor}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
                {errors.email && (
                  <Text className="text-red-500 text-xs mt-1 ml-1">{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View className="mt-4">
                <Text className="text-muted text-sm font-medium mb-2 ml-1">
                  Password
                </Text>
                <View className={`flex-row items-center bg-card rounded-2xl px-4 border ${errors.password ? "border-red-500" : "border-border"}`}>
                  <MaterialIcons name="lock" size={20} color={iconColor} />
                  <TextInput
                    className="flex-1 py-4 px-3 text-foreground text-base"
                    placeholder="Enter your password"
                    placeholderTextColor={placeholderColor}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                      size={20}
                      color={iconColor}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-xs mt-1 ml-1">{errors.password}</Text>
                )}
              </View>

              {/* Forgot Password */}
              <TouchableOpacity className="self-end mt-2">
                <Text className="text-deep-twilight-400 text-sm font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <TouchableOpacity
                className={`mt-6 py-4 rounded-2xl flex-row items-center justify-center ${
                  isLoading ? "bg-deep-twilight-600" : "bg-deep-twilight-500"
                }`}
                onPress={handleSignIn}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Text className="text-white font-bold text-base mr-2">
                      Sign In
                    </Text>
                    <MaterialIcons name="arrow-forward" size={20} color="white" />
                  </>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-[1px] bg-border" />
                <Text className="text-muted mx-4 text-sm">or continue with</Text>
                <View className="flex-1 h-[1px] bg-border" />
              </View>

              {/* Social Login */}
              <View className="flex-row gap-4">
                <TouchableOpacity className="flex-1 py-4 rounded-2xl bg-card border border-border flex-row items-center justify-center">
                  <MaterialIcons name="g-mobiledata" size={24} color={iconColor} />
                  <Text className="text-foreground font-medium ml-2">Google</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 py-4 rounded-2xl bg-card border border-border flex-row items-center justify-center">
                  <MaterialIcons name="apple" size={24} color={iconColor} />
                  <Text className="text-foreground font-medium ml-2">Apple</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-muted">Don't have an account? </Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity>
                  <Text className="text-deep-twilight-400 font-bold">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Demo Credentials */}
            <View className="mt-6 p-4 bg-muted/20 rounded-2xl border border-border">
              <Text className="text-muted text-xs text-center">
                Demo: demo@razortech.com / demo123
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
