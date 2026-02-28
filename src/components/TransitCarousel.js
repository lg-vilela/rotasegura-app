import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';

const { width } = Dimensions.get('window');

const TransitCarousel = ({ stations, onClose, userLocation }) => {
    const [currentAddress, setCurrentAddress] = useState('Buscando localização...');

    useEffect(() => {
        (async () => {
            if (userLocation) {
                try {
                    const result = await Location.reverseGeocodeAsync({
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                    });

                    if (result && result.length > 0) {
                        const address = result[0];
                        const streetName = address.street || address.name || 'Endereço não encontrado';
                        const streetNumber = address.streetNumber ? `, ${address.streetNumber}` : '';
                        setCurrentAddress(`${streetName}${streetNumber}`);
                    }
                } catch (error) {
                    setCurrentAddress('Sua localização atual');
                }
            }
        })();
    }, [userLocation]);

    // Caso não venha estações, usamos um mock com o endereço real obtido
    const mockStations = stations || [
        {
            id: '1',
            name: currentAddress,
            distance: 'Próximo a você',
            walkTime: 'Você está aqui',
            lines: [
                { id: 'l1', number: '5018-31', destination: 'Jabaquara', time: '1 min', timeLabel: 'min', color: COLORS.primary },
                { id: 'l2', number: '546A-10', destination: 'Jd. Apurá', time: '3 min', timeLabel: 'min', color: COLORS.primary },
            ]
        }
    ];

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {mockStations.map((station) => (
                    <View key={station.id} style={styles.card}>
                        {/* Header Station */}
                        <View style={styles.header}>
                            <View style={styles.headerTitleRow}>
                                <Text style={styles.headerLabel}>Nearest Station</Text>
                                <View style={styles.headerButtons}>
                                    <TouchableOpacity style={styles.iconButton} onPress={onClose}>
                                        <MaterialCommunityIcons name="close" size={20} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.iconButton}>
                                        <MaterialCommunityIcons name="bell" size={20} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.iconButton, styles.trackButton]}>
                                        <MaterialCommunityIcons name="bus-side" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.stationInfoRow}>
                                <View style={styles.stationIconBg}>
                                    <MaterialCommunityIcons name="transit-transfer" size={24} color="#84CC16" />
                                </View>
                                <View style={styles.stationTextContainer}>
                                    <Text style={styles.stationName}>{station.name}</Text>
                                    <Text style={styles.stationDistance}>
                                        {station.distance} • {station.walkTime}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={styles.divider} />

                        {/* Lines List */}
                        <View style={styles.linesContainer}>
                            {station.lines.map((line) => (
                                <View key={line.id} style={styles.lineRow}>
                                    <View style={styles.lineBadgeContainer}>
                                        <View style={[styles.lineBadge, { borderColor: line.color }]}>
                                            <MaterialCommunityIcons name="bus" size={16} color="white" />
                                            <Text style={styles.lineNumber}>{line.number}</Text>
                                        </View>
                                        <Text style={styles.lineDestination}>{line.destination}</Text>
                                    </View>

                                    <View style={styles.timeBadgeContainer}>
                                        <View style={styles.timeBadge}>
                                            <MaterialCommunityIcons name="car-multiple" size={14} color="#F59E0B" />
                                            <Text style={styles.timeValue}>{line.time}</Text>
                                            <Text style={styles.timeLabel}>{line.timeLabel}</Text>
                                        </View>
                                        <Text style={styles.nextTimes}>6, 26 min</Text>
                                    </View>
                                </View>
                            ))}
                            <View style={styles.footerInfo}>
                                <MaterialCommunityIcons name="wheelchair-accessibility" size={16} color={COLORS.textSecondary} />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <TouchableOpacity style={styles.refreshButton}>
                    <MaterialCommunityIcons name="refresh" size={18} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 80, // Acima do TransitSheet
        zIndex: 10,
    },
    scrollContent: {
        paddingHorizontal: 15,
    },
    card: {
        width: width - 30,
        backgroundColor: '#1E293B',
        borderRadius: 24,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    header: {
        marginBottom: 15,
    },
    headerTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerLabel: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '600',
    },
    headerButtons: {
        flexDirection: 'row',
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    trackButton: {
        width: 64,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        paddingHorizontal: 12,
    },
    stationInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stationIconBg: {
        width: 48,
        height: 48,
        backgroundColor: COLORS.surface,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stationTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    stationName: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    stationDistance: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 10,
    },
    linesContainer: {
        marginTop: 5,
    },
    lineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    lineBadgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    lineBadge: {
        flexDirection: 'row',
        backgroundColor: '#0F172A',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 6,
        borderWidth: 1,
        borderBottomWidth: 3,
        alignItems: 'center',
        marginRight: 12,
    },
    lineNumber: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 4,
    },
    lineDestination: {
        color: COLORS.textSecondary,
        fontSize: 15,
        fontWeight: '500',
    },
    timeBadgeContainer: {
        alignItems: 'flex-end',
    },
    timeBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeValue: {
        color: COLORS.success,
        fontSize: 18,
        fontWeight: '800',
        marginLeft: 6,
    },
    timeLabel: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginLeft: 4,
        marginTop: 4,
    },
    nextTimes: {
        color: COLORS.success,
        fontSize: 11,
        fontWeight: '700',
        marginTop: 2,
    },
    footerInfo: {
        marginTop: -5,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#475569',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#94A3B8',
        width: 10,
        height: 10,
    },
    refreshButton: {
        marginLeft: 15,
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default TransitCarousel;
