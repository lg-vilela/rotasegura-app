import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';

const SOSButton = ({ onPress }) => {
    return (
        <View style={styles.shadowWrapper}>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={onPress}
            >
                <MaterialCommunityIcons name="alert-octagon" size={32} color={COLORS.white} />
            </TouchableOpacity>
            {/* Pulsing Aura Effect */}
            <View style={styles.pulse} />
        </View>
    );
};

const styles = StyleSheet.create({
    shadowWrapper: {
        position: 'absolute',
        bottom: 110,
        right: 25,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: COLORS.critical,
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: COLORS.critical,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        zIndex: 2,
    },
    pulse: {
        position: 'absolute',
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.critical,
        opacity: 0.3,
        transform: [{ scale: 1.2 }],
        zIndex: 1,
    }
});

export default SOSButton;
