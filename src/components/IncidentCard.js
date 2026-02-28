import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../constants/colors';

const IncidentCard = ({ incident }) => {
    const getPriorityConfig = () => {
        switch (incident.type) {
            case 'critical': return { color: COLORS.critical, label: 'Alta Prioridade' };
            case 'warning': return { color: COLORS.alert, label: 'Média Prioridade' };
            default: return { color: COLORS.primary, label: 'Informativo' };
        }
    };

    const config = getPriorityConfig();

    return (
        <View style={[styles.container, { borderLeftColor: config.color }]}>
            <View style={styles.iconWrapper}>
                <MaterialCommunityIcons name={incident.icon || 'alert-decagram'} size={24} color={config.color} />
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{incident.title}</Text>
                    <Text style={styles.time}>{incident.time || 'há 2 min'}</Text>
                </View>
                <Text style={styles.desc}>{incident.desc}</Text>
                <View style={styles.badgeRow}>
                    <View style={[styles.badge, { backgroundColor: config.color + '20' }]}>
                        <Text style={[styles.badgeText, { color: config.color }]}>{incident.category}</Text>
                    </View>
                    <View style={styles.priorityBadge}>
                        <Text style={styles.priorityText}>{config.label}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        marginBottom: 15,
        borderLeftWidth: 4,
    },
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1E293B',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    },
    time: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    desc: {
        color: COLORS.textSecondary,
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 12,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 8,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    priorityBadge: {
        backgroundColor: '#334155',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    priorityText: {
        color: COLORS.textSecondary,
        fontSize: 11,
        fontWeight: '600',
    }
});

export default IncidentCard;
