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

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { register, isLoading } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#94a3b8" : "#475569";
  const placeholderColor = colorScheme === "dark" ? "#64748b" : "#94a3b8";

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    const success = await register(name, email, password);

    if (success) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Registration Failed", "An account with this email already exists.");
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
          <View className="flex-1 px-6 pt-6 pb-6">
            {/* Back Button */}
            <Link href="/(auth)/signin" asChild>
              <TouchableOpacity className="w-12 h-12 rounded-full bg-card items-center justify-center mb-6">
                <MaterialIcons name="arrow-back" size={24} color={iconColor} />
              </TouchableOpacity>
            </Link>

            {/* Header */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-foreground mb-2">
                Create Account
              </Text>
              <Text className="text-muted">
                Join RaZoR Tech and start shopping
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
              {/* Name Input */}
              <View>
                <Text className="text-muted text-sm font-medium mb-2 ml-1">
                  Full Name
                </Text>
                <View className={`flex-row items-center bg-card rounded-2xl px-4 border ${errors.name ? "border-red-500" : "border-border"}`}>
                  <MaterialIcons name="person" size={20} color={iconColor} />
                  <TextInput
                    className="flex-1 py-4 px-3 text-foreground text-base"
                    placeholder="Enter your name"
                    placeholderTextColor={placeholderColor}
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    autoCapitalize="words"
                    autoComplete="name"
                  />
                </View>
                {errors.name && (
                  <Text className="text-red-500 text-xs mt-1 ml-1">{errors.name}</Text>
                )}
              </View>

              {/* Email Input */}
              <View className="mt-4">
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
                      if (errors.email) setErrors({ ...errors, email: "" });
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
                    placeholder="Create a password"
                    placeholderTextColor={placeholderColor}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password) setErrors({ ...errors, password: "" });
                    }}
                    secureTextEntry={!showPassword}
                    autoComplete="password-new"
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

              {/* Confirm Password Input */}
              <View className="mt-4">
                <Text className="text-muted text-sm font-medium mb-2 ml-1">
                  Confirm Password
                </Text>
                <View className={`flex-row items-center bg-card rounded-2xl px-4 border ${errors.confirmPassword ? "border-red-500" : "border-border"}`}>
                  <MaterialIcons name="lock-outline" size={20} color={iconColor} />
                  <TextInput
                    className="flex-1 py-4 px-3 text-foreground text-base"
                    placeholder="Confirm your password"
                    placeholderTextColor={placeholderColor}
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                    }}
                    secureTextEntry={!showPassword}
                  />
                </View>
                {errors.confirmPassword && (
                  <Text className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Terms Checkbox */}
              <TouchableOpacity
                className="flex-row items-start mt-4"
                onPress={() => {
                  setAcceptTerms(!acceptTerms);
                  if (errors.terms) setErrors({ ...errors, terms: "" });
                }}
              >
                <View className={`w-6 h-6 rounded-lg border-2 mr-3 items-center justify-center ${
                  acceptTerms ? "bg-deep-twilight-500 border-deep-twilight-500" : "border-muted"
                }`}>
                  {acceptTerms && <MaterialIcons name="check" size={16} color="white" />}
                </View>
                <Text className="flex-1 text-muted text-sm leading-5">
                  I agree to the{" "}
                  <Text className="text-deep-twilight-400">Terms of Service</Text> and{" "}
                  <Text className="text-deep-twilight-400">Privacy Policy</Text>
                </Text>
              </TouchableOpacity>
              {errors.terms && (
                <Text className="text-red-500 text-xs ml-9">{errors.terms}</Text>
              )}

              {/* Sign Up Button */}
              <TouchableOpacity
                className={`mt-6 py-4 rounded-2xl flex-row items-center justify-center ${
                  isLoading ? "bg-deep-twilight-600" : "bg-deep-twilight-500"
                }`}
                onPress={handleSignUp}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Text className="text-white font-bold text-base mr-2">
                      Create Account
                    </Text>
                    <MaterialIcons name="arrow-forward" size={20} color="white" />
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-muted">Already have an account? </Text>
              <Link href="/(auth)/signin" asChild>
                <TouchableOpacity>
                  <Text className="text-deep-twilight-400 font-bold">Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
