# Supabase OAuth with Google Cloud Setup for React Native

This guide provides step-by-step instructions to integrate Google OAuth authentication using Supabase in a React Native application.

---

## Prerequisites

1. A [Google Cloud Console](https://console.cloud.google.com/) account.
2. A [Supabase](https://supabase.com/) account with an active project.
3. React Native development environment set up (e.g., using Expo or React Native CLI).

---

## Steps

### 1. Configure Google OAuth in Google Cloud Console

1. **Create a New Project**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.

2. **Enable the OAuth Consent Screen**:
   - Navigate to `APIs & Services > OAuth consent screen`.
   - Choose the **User Type** (External for most apps).
   - Fill in the required fields (App name, support email, etc.).
   - Add scopes for the project (e.g., email, profile).
   - Save and proceed.

3. **Create OAuth Credentials**:
   - Navigate to `APIs & Services > Credentials`.
   - Click **Create Credentials** > **OAuth Client ID**.
   - Select **Web Application** as the application type.
   - Add the following to **Authorized redirect URIs**:
     ```
     https://<your-supabase-project-id>.supabase.co/auth/v1/callback
     ```
     Replace `<your-supabase-project-id>` with your actual Supabase project ID (found in your Supabase Dashboard URL).
   - Click **Create** to generate the Client ID and Client Secret.

4. **Note the Credentials**:
   - Copy the **Client ID** and **Client Secret** for later use.

---

### 2. Configure Supabase for Google OAuth

1. **Navigate to Supabase Dashboard**:
   - Go to your Supabase project.
   - Click on `Authentication > Settings`.

2. **Enable Google OAuth**:
   - Scroll to **External OAuth Providers**.
   - Enable the **Google** provider.
   - Enter the **Client ID** and **Client Secret** from the Google Cloud Console.
   - Save the settings.

---

### 3. Integrate Google OAuth in React Native

1. **Install Dependencies**:
   Run the following commands to install necessary packages:
   ```bash
   npm install @supabase/supabase-js expo-router @expo/vector-icons
   ```

2. **Set Up Supabase Client**:
   Create a file `supabase.js` in your project:
   ```javascript
   import AsyncStorage from '@react-native-async-storage/async-storage';
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = 'https://<your-supabase-project-id>.supabase.co';
   const supabaseAnonKey = '<your-anon-key>';

   export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
     auth: {
       storage: AsyncStorage,
       autoRefreshToken: true,
       persistSession: true,
       detectSessionInUrl: false,
     },
   });
   ```

3. **Update Signup Screen for Google OAuth**:
   Modify your signup screen to include Google OAuth functionality:
   ```javascript
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
   import { FontAwesome } from '@expo/vector-icons';

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
           Alert.alert('Signup Error', error.message || 'An error occurred.');
         } else {
           Alert.alert('Success', 'Check your email for the confirmation link.', [
             { text: 'OK', onPress: () => router.push('/Home') },
           ]);
         }
       } catch (error) {
         Alert.alert('Unexpected Error', 'Something went wrong.');
       } finally {
         setLoading(false);
       }
     };

     const handleGoogleSignup = async () => {
       try {
         setLoading(true);
         const { error } = await supabase.auth.signInWithOAuth({
           provider: 'google',
           options: {
             redirectTo: 'exp://localhost:19000',
           },
         });

         if (error) {
           Alert.alert('Google Signup Error', error.message || 'An error occurred.');
         } else {
           router.push('/Home');
         }
       } catch (error) {
         Alert.alert('Unexpected Error', 'Something went wrong.');
       } finally {
         setLoading(false);
       }
     };

     return (
       <View className="flex-1 justify-center bg-gray-100 p-6">
         <TextInput
           placeholder="Email"
           value={email}
           onChangeText={setEmail}
         />
         <TextInput
           placeholder="Password"
           value={password}
           onChangeText={setPassword}
           secureTextEntry
         />
         <TouchableOpacity onPress={handleSignup} disabled={loading}>
           <Text>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={handleGoogleSignup}>
           <FontAwesome name="google" size={20} />
           <Text>Sign Up with Google</Text>
         </TouchableOpacity>
       </View>
     );
   };

   export default Signup;
   ```

4. **Run Your App**:
   - Start the development server: `npm start`.
   - Test the email/password and Google signup flows.

---

### Notes
- Replace `exp://localhost:19000` with your production redirect URL when deploying.
- Ensure your Google Cloud OAuth credentials match the environment.

---

You're all set! If you encounter any issues, refer to the Supabase and Google Cloud documentation or reach out for help.

