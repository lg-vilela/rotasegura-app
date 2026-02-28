import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';

const SuccessScreen = ({ onBackToMap, onSeeReport }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.successIconWrapper}>
                    <View style={styles.aura} />
                    <View style={styles.innerCircle}>
                        <MaterialCommunityIcons name="check-bold" size={48} color={COLORS.success} />
                    </View>
                </View>

                <Text style={styles.title}>Reporte Enviado!</Text>

                <View style={styles.pointsBadge}>
                    <MaterialCommunityIcons name="star" size={16} color={COLORS.alert} />
                    <Text style={styles.pointsBadgeText}>+50 XP DE CONTRIBUIÇÃO</Text>
                </View>

                <Text style={styles.subtitle}>
                    Obrigado por colaborar com a comunidade RotaSegura. Sua contribuição ajuda outros passageiros.
                </Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.mainButton} onPress={onBackToMap}>
                    <Text style={styles.mainButtonText}>Voltar ao Mapa</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={onSeeReport}>
                    <Text style={styles.secondaryButtonText}>Ver meu reporte</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    successIconWrapper: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    aura: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.success,
        opacity: 0.1,
    },
    innerCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#1E293B',
        borderWidth: 2,
        borderColor: COLORS.success,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.white,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
    },
    pointsBadge: {
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: 'rgba(251, 191, 36, 0.3)',
    },
    pointsBadgeText: {
        color: COLORS.alert,
        fontSize: 12,
        fontWeight: '900',
        marginLeft: 6,
        letterSpacing: 0.5,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    mainButton: {
        backgroundColor: COLORS.primary,
        width: '100%',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    mainButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        padding: 10,
    },
    secondaryButtonText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    }
});

export default SuccessScreen;
