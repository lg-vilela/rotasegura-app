import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import COLORS from '../constants/colors';

const TransitStopMarker = ({ stop, onPress }) => {
    if (!stop) return null;

    const coordinate = {
        latitude: stop.lat,
        longitude: stop.lng
    };

    return (
        <Marker coordinate={coordinate} onPress={onPress}>
            <View style={[
                styles.container,
                { backgroundColor: stop.type === 'bus' ? COLORS.primary : '#1E40AF' }
            ]}>
                <MaterialCommunityIcons
                    name={stop.type === 'bus' ? 'bus' : 'subway-variant'}
                    size={16}
                    color="white"
                />
            </View>
        </Marker>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default TransitStopMarker;
