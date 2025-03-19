import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfigs';

export default function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const onSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter your email and password", ToastAndroid.LONG);
      return;
    }

    if (!validateEmail(email)) {
      ToastAndroid.show("Please enter a valid email address", ToastAndroid.LONG);
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        // Send another verification email if needed
        await sendEmailVerification(user);
        ToastAndroid.show(
          'Please verify your email first. A new verification email has been sent.',
          ToastAndroid.LONG
        );
        return;
      }

      console.log('User signed in:', user.uid);
      ToastAndroid.show('Signed in successfully!', ToastAndroid.SHORT);
      router.replace('/(tabs)/Mytrip');
    } catch (error) {
      console.error('Sign in error:', error.message);
      
      if (error.code === 'auth/invalid-credential') {
        ToastAndroid.show('invalid credential', ToastAndroid.LONG);
        return;
      }
      
      let errorMessage = 'An error occurred during sign in';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
        default:
          errorMessage = 'Sign in failed. Please try again';
          break;
      }
      
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.numText}>Let's Sign In</Text>
      <Text style={styles.waText}>Welcome Back! You have been missed</Text>

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
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="gray"
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          onChangeText={(value) => setPassword(value)}
          value={password}
          editable={!isLoading}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} disabled={isLoading}>
          <Feather name={passwordVisible ? "eye" : "eye-off"} size={20} color="gray" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity 
        onPress={onSignIn} 
        style={styles.signInButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signInButtonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      {/* Create Account Link */}
      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>Don't have an account? </Text>
        <Link href="/auth/sign-up" asChild>
          <TouchableOpacity disabled={isLoading}>
            <Text style={styles.createAccountLink}>Create Account</Text>
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
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  numText: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    marginBottom: 10,
  },
  waText: {
    fontFamily: 'outfit-regular',
    fontSize: 26,
    color: 'gray',
    marginBottom: 20,
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
    fontFamily: 'outfit-regular',
  },
  signInButton: {
    backgroundColor: '#000',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'outfit-bold',
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  createAccountText: {
    fontSize: 16,
    fontFamily: 'outfit-regular',
    color: 'gray',
  },
  createAccountLink: {
    fontSize: 16,
    fontFamily: 'outfit-bold',
    color: '#000',
  },
});