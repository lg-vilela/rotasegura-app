import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// =====================================================================
// LIÇÃO 1: COMPONENTES
// Este é um "Componente Funcional". Pense nele como uma tag HTML personalizada
// que criamos. No final, vamos usar <MapScreen /> em outro lugar.
// =====================================================================
export default function MapScreen() {
  return (
    // <View> é como uma <div> no HTML. É um container.
    // O estilo 'styles.container' diz para ela ocupar a tela toda.
    <View style={styles.container}>
      
      {/* 
        <MapView> é o componente que traz o Google Maps.
        provider={PROVIDER_GOOGLE}: Força usar mapas do Google (padrão no Android, opcional no iOS).
        style={styles.map}: Define tamanho (100% de largura e altura).
      */}
      <MapView 
        provider={PROVIDER_GOOGLE} 
        style={styles.map}
        initialRegion={{
          latitude: -23.55052, // Exemplo: São Paulo (Centro)
          longitude: -46.633309,
          latitudeDelta: 0.0922, // Zoom
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

// =====================================================================
// LIÇÃO 2: ESTILOS (StyleSheet)
// No React Native, não usamos arquivos CSS separados (.css).
// Usamos Javascript para criar estilos. É muito parecido com CSS.
// flex: 1 -> Significa "ocupe todo o espaço disponível".
// =====================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
