import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../constants/colors';

const ProfileStats = ({ reportes, validacoes, impacto }) => {
    const stats = [
        { label: 'Reportes', value: reportes },
        { label: 'Validações', value: validacoes },
        { label: 'Impacto', value: impacto },
    ];

    return (
        <View style={styles.container}>
            {stats.map((item, index) => (
                <View key={index} style={styles.statBox}>
                    <Text style={styles.value}>{item.value}</Text>
                    <Text style={styles.label}>{item.label}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    statBox: {
        backgroundColor: COLORS.surface,
        width: '31%',
        paddingVertical: 20,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    value: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: '800',
    },
    label: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500',
    },
});

export default ProfileStats;
