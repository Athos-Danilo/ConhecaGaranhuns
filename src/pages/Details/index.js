import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Details({ route }) {
  return (
    <View style={styles.container}>
      <Text>Tela Detalhes em branco (Aguardando protótipo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

