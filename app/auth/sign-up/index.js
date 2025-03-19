import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfigs';

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');

  const [fontsLoaded] = useFonts({
    'outfit-bold': require('../../../assets/fonts/Outfit-Bold.ttf'),
    'outfit-regular': require('../../../assets/fonts/Outfit-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validateForm = () => {
    if (!email || !password || !fullname) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.LONG);
      return false;
    }
    if (!validateEmail(email)) {
      ToastAndroid.show('Please enter a valid email address', ToastAndroid.LONG);
      return false;
    }
    if (password.length < 6) {
      ToastAndroid.show('Password must be at least 6 characters', ToastAndroid.LONG);
      return false;
    }
    return true;
  };

  const OnCreateAccount = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created:', user.uid);
      
      // Send verification email
      await sendEmailVerification(user);
      
      ToastAndroid.show(
        'Account created! Please check your email to verify your account before signing in.',
        ToastAndroid.LONG
      );
      router.replace('/auth/sign-in');
    } catch (error) {
      console.error('Signup error:', error.message);
      let errorMessage = 'An error occurred during sign up';
      
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
      }
      
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && password && fullname && validateEmail(email) && password.length >= 6;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={[styles.title, { fontFamily: 'outfit-bold' }]}>Create Account</Text>
      <Text style={[styles.subtitle, { fontFamily: 'outfit-regular' }]}>Create an account to get started</Text>

      {/* Name Input Field */}
      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={[styles.input, { fontFamily: 'outfit-regular' }]}
          placeholder="Enter your full name"
          onChangeText={(value) => setFullname(value)}
          placeholderTextColor="gray"
          value={fullname}
          editable={!isLoading}
        />
      </View>

      {/* Email Input Field */}
      <View style={[
        styles.inputContainer,
        email && !validateEmail(email) && styles.inputError
      ]}>
        <Feather name="mail" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={[styles.input, { fontFamily: 'outfit-regular' }]}
          placeholder="Enter your email"
          placeholderTextColor="gray"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => setEmail(value)}
          value={email}
          editable={!isLoading}
        />
      </View>

      {/* Password Input Field */}
      <View style={[
        styles.inputContainer,
        password && password.length < 6 && styles.inputError
      ]}>
        <Feather name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={[styles.input, { fontFamily: 'outfit-regular' }]}
          placeholder="Create password"
          placeholderTextColor="gray"
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          onChangeText={(value) => setPassword(value)}
          value={password}
          editable={!isLoading}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} disabled={isLoading}>
          <Feather 
            name={passwordVisible ? "eye" : "eye-off"} 
            size={20} 
            color="gray" 
            style={styles.icon} 
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity 
        onPress={OnCreateAccount} 
        style={[
          styles.signUpButton,
          (!isFormValid || isLoading) && styles.signUpButtonDisabled
        ]}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.signUpButtonText, { fontFamily: 'outfit-bold' }]}>
            Create Account
          </Text>
        )}
      </TouchableOpacity>

      {/* Sign In Link */}
      <View style={styles.signInContainer}>
        <Text style={[styles.signInText, { fontFamily: 'outfit-regular' }]}>Already have an account? </Text>
        <Link href="/auth/sign-in" asChild>
          <TouchableOpacity disabled={isLoading}>
            <Text style={[styles.signInLink, { fontFamily: 'outfit-bold' }]}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 26,
    color: 'gray',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
  },
  inputError: {
    borderColor: '#FF3B30',
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#000000',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  signUpButtonDisabled: {
    backgroundColor: '#666666',
    opacity: 0.7,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: 'gray',
  },
  signInLink: {
    fontSize: 16,
    color: '#000',
  },
});