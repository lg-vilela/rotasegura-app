import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';

const IncidentDetailCard = ({ incident, onClose }) => {
    if (!incident) return null;

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="bus-clock" size={32} color={COLORS.white} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{incident.title} on Line 404</Text>
                <Text style={styles.subtitle}>
                    Reported 2 min ago near Central Station. Heavy traffic congestion.
                </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialCommunityIcons name="close" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E293B',
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: COLORS.critical + '33',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    content: {
        flex: 1,
    },
    title: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 13,
        marginTop: 4,
        lineHeight: 18,
    },
    closeButton: {
        padding: 5,
    }
});

export default IncidentDetailCard;
