import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../constants/colors';

const HistoryItem = ({ item }) => {
    const isAtivo = item.status === 'Ativo';

    return (
        <View style={styles.container}>
            <View style={[styles.iconWrapper, { backgroundColor: item.color + '20' }]}>
                <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={[styles.statusBadge, isAtivo ? styles.activeBadge : styles.resolvedBadge]}>
                        <Text style={[styles.statusText, { color: isAtivo ? COLORS.critical : COLORS.success }]}>
                            {item.status}
                        </Text>
                    </View>
                </View>
                <Text style={styles.subtitle}>{item.location} • {item.time}</Text>
                <View style={styles.meta}>
                    <View style={styles.metaItem}>
                        <MaterialCommunityIcons name="thumb-up-outline" size={14} color={COLORS.textSecondary} />
                        <Text style={styles.metaText}>{item.likes}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <MaterialCommunityIcons name={isAtivo ? "eye-outline" : "check-decagram-outline"} size={14} color={COLORS.textSecondary} />
                        <Text style={styles.metaText}>{isAtivo ? item.views : 'Verificado'}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 12,
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
        fontSize: 15,
        fontWeight: '700',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    activeBadge: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
    },
    resolvedBadge: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginBottom: 10,
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    metaText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginLeft: 4,
    }
});

export default HistoryItem;
