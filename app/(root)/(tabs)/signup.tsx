import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // Install: expo install @expo/vector-icons
import 'tailwindcss/tailwind.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.log('Signup Error:', error);
        Alert.alert('Signup Error', error.message || 'An error occurred during signup.');
      } else if (data.user) {
        Alert.alert('Success', 'Check your email for the confirmation link.', [
          { text: 'OK', onPress: () => router.push('/Home') },
        ]);
      }
    } catch (error) {
      Alert.alert('Unexpected Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        console.log('Google Signup Error:', error);
        Alert.alert('Google Signup Error', error.message || 'An error occurred.');
      } else {
        router.push('/Home');
      }
    } catch (error) {
      console.log('Unexpected Error:', error);
      Alert.alert('Unexpected Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View className="flex-1 justify-center bg-gray-100 p-6">
      <View className="items-center mb-6">
        <Text className="text-3xl font-bold text-gray-800">Welcome!</Text>
        <Text className="text-gray-600 mt-2">Sign up to continue</Text>
      </View>

      <View className="bg-white rounded-lg shadow-md p-6">
        <TextInput
          className="w-full bg-gray-100 p-4 rounded-lg mb-4 border border-gray-300"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="w-full bg-gray-100 p-4 rounded-lg mb-4 border border-gray-300"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className={`w-full p-4 rounded-lg ${
            loading ? 'bg-gray-300' : 'bg-blue-600'
          }`}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-center text-white font-bold">Sign Up</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row items-center mt-4">
          <View className="flex-1 h-px bg-gray-300"></View>
          <Text className="px-4 text-gray-600">OR</Text>
          <View className="flex-1 h-px bg-gray-300"></View>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center mt-4 p-4 rounded-lg bg-red-600"
          onPress={handleGoogleSignup}
        >
          <FontAwesome name="google" size={20} color="#fff" />
          <Text className="text-white font-bold ml-2">Sign Up with Google</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6 items-center">
        <Text className="text-gray-600">
          Already have an account?{' '}
          <Text
            className="text-blue-600 font-bold"
            onPress={() => router.push('/Login')}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Signup;
