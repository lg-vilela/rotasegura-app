import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';

const Toast = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success'); // 'success', 'error', 'info'
    const translateY = new Animated.Value(-100);

    useImperativeHandle(ref, () => ({
        show: (msg, toastType = 'success') => {
            setMessage(msg);
            setType(toastType);
            setVisible(true);
            Animated.spring(translateY, {
                toValue: 50,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                hide();
            }, 3000);
        }
    }));

    const hide = () => {
        Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };

    if (!visible) return null;

    const getIcon = () => {
        switch (type) {
            case 'error': return 'alert-circle';
            case 'info': return 'information';
            default: return 'check-circle';
        }
    };

    const getColor = () => {
        switch (type) {
            case 'error': return COLORS.critical || '#EF4444';
            case 'info': return COLORS.primary || '#2563EB';
            default: return COLORS.success || '#22C55E';
        }
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY }], backgroundColor: COLORS.surface, borderLeftColor: getColor() }]}>
            <MaterialCommunityIcons name={getIcon()} size={24} color={getColor()} />
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity onPress={hide}>
                <MaterialCommunityIcons name="close" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
        borderLeftWidth: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    message: {
        flex: 1,
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '600',
        marginHorizontal: 12,
    },
});

export default Toast;
