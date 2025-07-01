import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'فشل تسجيل الدخول');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28, color: colors.primary, fontWeight: 'bold', marginBottom: 24 }}>تسجيل الدخول</Text>
      <TextInput
        label="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        label="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error && <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text>}
      <Button mode="contained" onPress={handleLogin} loading={loading} style={styles.button}>
        دخول
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 16 }}>
        <Text style={{ color: colors.primary }}>ليس لديك حساب؟ سجل الآن</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    marginTop: 8,
  },
}); 