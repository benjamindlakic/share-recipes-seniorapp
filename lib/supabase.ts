import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://macizzktpnbevawfcnfa.supabase.co';
const supabaseAnonKey = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hY2l6emt0cG5iZXZhd2ZjbmZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxNDU1MDcsImV4cCI6MjAzMTcyMTUwN30.ctEIO4PAhoyQ6cAjGriZiwGk-51EsJ-D0eUQQEheD4w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});