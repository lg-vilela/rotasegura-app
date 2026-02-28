import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const ActionButtons = ({ onPress }) => {
    return (
        <View style={styles.wrapper}>
            {/* Outer Glow effect */}
            <View style={styles.glow} />

            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.button}
                onPress={onPress}
            >
                <View style={styles.innerRing}>
                    <MaterialCommunityIcons name="megaphone-outline" size={32} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 35,
        right: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    glow: {
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#2563EB',
        opacity: 0.15,
    },
    button: {
        backgroundColor: '#2563EB',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    innerRing: {
        width: 58,
        height: 58,
        borderRadius: 29,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ActionButtons;
