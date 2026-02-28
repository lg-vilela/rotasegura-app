import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import COLORS from '@/src/constants/colors';

export default function EmergenciaScreen() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation.coords);
            }
        })();
    }, []);

    const handleCall = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    const handleAlertContact = () => {
        Alert.alert(
            "Rastreamento Ativado",
            "Sua localização atualizada está sendo compartilhada em tempo real com seu contato de segurança.",
            [{ text: "Entendido" }]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <View style={styles.sosIcon}>
                    <MaterialCommunityIcons name="shield-alert" size={48} color={COLORS.critical} />
                </View>
                <Text style={styles.title}>EMERGÊNCIA</Text>
                <Text style={styles.subtitle}>Escolha uma ação imediata para sua segurança</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.policeButton]}
                    onPress={() => handleCall('190')}
                >
                    <MaterialCommunityIcons name="police-badge" size={32} color={COLORS.white} />
                    <View style={styles.actionTextContainer}>
                        <Text style={styles.actionText}>190 - POLÍCIA</Text>
                        <Text style={styles.actionSubtext}>Acionar Polícia Militar</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.samuButton]}
                    onPress={() => handleCall('192')}
                >
                    <MaterialCommunityIcons name="ambulance" size={32} color={COLORS.white} />
                    <View style={styles.actionTextContainer}>
                        <Text style={styles.actionText}>192 - SAMU</Text>
                        <Text style={styles.actionSubtext}>Serviço de Urgência</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.contactButton]}
                    onPress={handleAlertContact}
                >
                    <MaterialCommunityIcons name="share-variant" size={32} color={COLORS.primary} />
                    <View style={styles.actionTextContainer}>
                        <Text style={[styles.actionText, { color: COLORS.white }]}>DADOS DE LOCALIZAÇÃO</Text>
                        <Text style={styles.actionSubtext}>Compartilhar GPS em tempo real</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {location && (
                <View style={styles.locationContainer}>
                    <MaterialCommunityIcons name="map-marker-radius" size={20} color={COLORS.textSecondary} />
                    <Text style={styles.locationText}>
                        Sua Localização: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </Text>
                </View>
            )}

            <View style={styles.infoBox}>
                <MaterialCommunityIcons name="information-outline" size={18} color={COLORS.textSecondary} />
                <Text style={styles.infoText}>
                    Ao acionar um serviço de emergência, certifique-se de estar em um local seguro se possível.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: 25,
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    sosIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: COLORS.critical,
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: 2,
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    actions: {
        gap: 20,
    },
    actionButton: {
        flexDirection: 'row',
        height: 80,
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    policeButton: {
        backgroundColor: COLORS.critical,
    },
    samuButton: {
        backgroundColor: '#CA8A04',
    },
    contactButton: {
        backgroundColor: COLORS.surface,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    actionTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    actionText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '800',
    },
    actionSubtext: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        fontWeight: '600',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 15,
        borderRadius: 16,
        marginTop: 40,
    },
    locationText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginLeft: 10,
    },
    infoBox: {
        flexDirection: 'row',
        marginTop: 30,
        paddingHorizontal: 10,
        opacity: 0.8,
    },
    infoText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginLeft: 8,
        lineHeight: 18,
        flex: 1,
    }
});
