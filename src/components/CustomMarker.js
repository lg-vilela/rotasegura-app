import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import COLORS from '../constants/colors';

const CustomMarker = ({ coordinate, type, color, label, onPress }) => {
    const getMarkerConfig = () => {
        // Se a cor for passada via prop, usamos ela. Caso contrário, mapeamos o tipo.
        if (color) {
            return {
                color: color,
                icon: type === 'Segurança' ? 'shield-alert' :
                    type === 'Lotação' ? 'account-group' :
                        type === 'Avaria' ? 'wrench' :
                            type === 'Seguro' ? 'check-bold' : 'information',
                label: label || type
            };
        }

        switch (type) {
            case 'critical':
                return { color: COLORS.critical, icon: 'alert', label: 'Perigo' };
            case 'warning':
                return { color: COLORS.alert, icon: 'wrench', label: 'Avaria' };
            case 'success':
                return { color: COLORS.success, icon: 'check-bold', label: 'Verificado' };
            default:
                return { color: COLORS.primary, icon: 'information', label: 'Info' };
        }
    };

    const config = getMarkerConfig();

    return (
        <Marker
            coordinate={coordinate}
            onPress={onPress}
            tracksViewChanges={false}
        >
            <View style={styles.container}>
                {/* Aura */}
                <View style={[styles.pulse, { backgroundColor: config.color, opacity: 0.3 }]} />

                {/* Pin Body */}
                <View style={[styles.pin, { borderColor: config.color }]}>
                    <View style={[styles.innerCircle, { backgroundColor: config.color }]}>
                        <MaterialCommunityIcons name={config.icon} size={14} color={COLORS.white} />
                    </View>
                </View>

                {/* Label Box */}
                <View style={styles.labelBox}>
                    <Text style={styles.labelText}>{config.label}</Text>
                </View>
            </View>
        </Marker>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
    },
    pulse: {
        position: 'absolute',
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    pin: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    innerCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelBox: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginTop: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    labelText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
    }
});

export default CustomMarker;
