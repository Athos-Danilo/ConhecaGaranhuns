import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar, Alert } from 'react-native';
import Animated, { FadeInDown, withTiming, useSharedValue, useAnimatedStyle, Easing } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const handleGoogleLogin = () => {
    Alert.alert(
      "Quase lá!", 
      "A interface está pronta! Para o login real com o Google abrir, precisaremos gerar uma chave (Client ID) lá no painel do Google Cloud. Te explico no chat!"
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Container da imagem preenchendo o topo de ponta a ponta */}
      <View style={styles.imageWrapper}>
        <Image 
          source={require('../../../assets/images/EntradaGaranhuns.png')} 
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </View>

      {/* Painel Inferior (Bottom Sheet) com animação fluida (sem tremedeira) */}
      <Animated.View 
        entering={FadeInDown.duration(800).easing(Easing.out(Easing.cubic))}
        style={styles.bottomSheet}
      >
        <View style={styles.dragIndicator} />

        <Text style={styles.title}>Explore Garanhuns</Text>
        <Text style={styles.subtitle}>Sua jornada pela Suíça Pernambucana começa aqui. Descubra os encantos e a cultura da cidade.</Text>

        {/* Botão do Google com ícone original */}
        <TouchableOpacity 
          style={styles.googleButton} 
          activeOpacity={0.8}
          onPress={handleGoogleLogin}
        >
          <View style={styles.googleIconContainer}>
            <Image 
              source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }} 
              style={styles.googleImage} 
            />
          </View>
          <Text style={styles.googleButtonText}>Continuar com o Google</Text>
        </TouchableOpacity>

        {/* Texto de rodapé */}
        <Text style={styles.footerText}>
          Ao continuar, você concorda com nossos <Text style={styles.linkText}>Termos de Serviço</Text> e <Text style={styles.linkText}>Política de Privacidade</Text>.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageWrapper: {
    width: '100%',
    height: height * 0.65, // Preenche todo o topo até encontrar o Bottom Sheet
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 51, 56, 0.15)', // Dark Green mais sutil para não escurecer tanto
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingBottom: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 20,
  },
  dragIndicator: {
    width: 45,
    height: 5,
    backgroundColor: '#DDDEDF',
    borderRadius: 3,
    marginBottom: 35,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0B3338', 
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#B4B8B9', 
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DDDEDF', 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  googleIconContainer: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleImage: {
    width: 24,
    height: 24,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B3338', 
    flex: 1,
    textAlign: 'center',
    marginRight: 39, // Ajustado para manter centralizado
  },
  footerText: {
    fontSize: 12,
    color: '#B4B8B9',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 18,
  },
  linkText: {
    color: '#5D8878', 
    fontWeight: 'bold',
  }
});
