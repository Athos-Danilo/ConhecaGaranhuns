import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const { profile, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Cabeçalho Personalizado com Perfil do Usuário */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: profile?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' }} 
            style={styles.profileAvatar} 
          />
          <View style={styles.userTextContainer}>
            <Text style={styles.greetingText}>Olá, {profile?.firstName || 'Explorador'}! 👋</Text>
            <Text style={styles.userEmail}>{profile?.email || 'Garanhuns, PE'}</Text>
          </View>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={24} color="#0B3338" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo Principal (Aguardando Protótipo de Telas) */}
      <View style={styles.content}>
        <View style={styles.placeholderCard}>
          <Ionicons name="compass-outline" size={48} color="#5D8878" style={{ marginBottom: 12 }} />
          <Text style={styles.placeholderTitle}>Pronto para explorar?</Text>
          <Text style={styles.placeholderSubtitle}>
            Sua conta do Google foi conectada com sucesso e os dados já foram salvos no Firestore!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#5D8878',
  },
  userTextContainer: {
    marginLeft: 12,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B3338',
  },
  userEmail: {
    fontSize: 13,
    color: '#B4B8B9',
    marginTop: 2,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f4f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B3338',
    marginBottom: 8,
  },
  placeholderSubtitle: {
    fontSize: 14,
    color: '#636e72',
    textAlign: 'center',
    lineHeight: 20,
  },
});
