import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';

const SOSModal = ({ visible, onClose, location }) => {
    const handleCall = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    const handleAlertContact = () => {
        Alert.alert(
            "Rastreamento Ativado",
            "Sua localização atualizada está sendo compartilhada em tempo real com seu contato de segurança.",
            [{ text: "Entendido", onPress: onClose }]
        );
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.sosIcon}>
                            <MaterialCommunityIcons name="shield-alert" size={32} color={COLORS.critical} />
                        </View>
                        <Text style={styles.title}>EMERGÊNCIA</Text>
                        <Text style={styles.subtitle}>Escolha uma ação imediata</Text>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.policeButton]}
                            onPress={() => handleCall('190')}
                        >
                            <MaterialCommunityIcons name="police-badge" size={28} color={COLORS.white} />
                            <Text style={styles.actionText}>190 - POLÍCIA</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.samuButton]}
                            onPress={() => handleCall('192')}
                        >
                            <MaterialCommunityIcons name="ambulance" size={28} color={COLORS.white} />
                            <Text style={styles.actionText}>192 - SAMU</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.contactButton]}
                            onPress={handleAlertContact}
                        >
                            <MaterialCommunityIcons name="share-variant" size={28} color={COLORS.primary} />
                            <View>
                                <Text style={[styles.actionText, { color: COLORS.white, marginBottom: 2 }]}>DADOS DE LOCALIZAÇÃO</Text>
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

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>CANCELAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(11, 18, 34, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: COLORS.surface,
        width: '100%',
        borderRadius: 24,
        padding: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    sosIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        color: COLORS.critical,
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: 2,
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginTop: 5,
    },
    actions: {
        gap: 15,
    },
    actionButton: {
        flexDirection: 'row',
        height: 64,
        borderRadius: 16,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    policeButton: {
        backgroundColor: COLORS.critical,
    },
    samuButton: {
        backgroundColor: '#CA8A04', // Darker yellow for SAMU
    },
    contactButton: {
        backgroundColor: COLORS.surface,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    actionText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '800',
        marginLeft: 15,
    },
    actionSubtext: {
        color: COLORS.textSecondary,
        fontSize: 11,
        fontWeight: '600',
        marginLeft: 15,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 12,
        borderRadius: 12,
        marginTop: 25,
        marginBottom: 20,
    },
    locationText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginLeft: 8,
    },
    closeButton: {
        alignItems: 'center',
        padding: 10,
    },
    closeButtonText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
    }
});

export default SOSModal;
