import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';

const FilterChips = ({ activeFilter, onFilterChange }) => {
    const filters = [
        { id: 'all', icon: 'apps', label: 'Tudo' },
        { id: 'critical', icon: 'alert-decagram', label: '🚨 Alertas Críticos' },
        { id: 'delays', icon: 'clock-alert', label: '⚠️ Atrasos' },
        { id: 'safe', icon: 'shield-check', label: '✅ Rotas Seguras' },
    ];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {filters.map((filter, index) => (
                <TouchableOpacity
                    key={filter.id}
                    style={[styles.chip, activeFilter === filter.id && styles.activeChip]}
                    onPress={() => onFilterChange(filter.id)}
                >
                    <MaterialCommunityIcons
                        name={filter.icon}
                        size={18}
                        color={activeFilter === filter.id ? COLORS.text : COLORS.textSecondary}
                        style={styles.icon}
                    />
                    <Text style={[styles.label, activeFilter === filter.id && styles.activeLabel]}>
                        {filter.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    activeChip: {
        backgroundColor: '#1E293B',
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    icon: {
        marginRight: 8,
    },
    label: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '600',
    },
    activeLabel: {
        color: COLORS.text,
    }
});

export default FilterChips;
