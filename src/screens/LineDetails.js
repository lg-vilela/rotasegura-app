import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Skeleton from '../components/Skeleton';
import COLORS from '../constants/colors';
import api from '../services/api';

const LineDetails = ({ line, onBack }) => {
    const [stops, setStops] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchItinerary = async () => {
            setLoading(true);
            try {
                const data = await api.getLineItinerary(line?.id);
                setStops(data);
            } catch (error) {
                // Silently fail or handle UI error
            } finally {
                setLoading(false);
            }
        };
        fetchItinerary();
    }, [line]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={28} color={COLORS.text} />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <View style={[styles.badge, { backgroundColor: line?.color || COLORS.primary }]}>
                        <Text style={styles.badgeText}>{line?.line || '875P-10'}</Text>
                    </View>
                    <Text style={styles.headerTitle} numberOfLines={1}>{line?.name || 'Lapa - Ana Rosa'}</Text>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.statusCard}>
                    <View style={styles.statusRow}>
                        <MaterialCommunityIcons name="clock-outline" size={20} color={COLORS.success} />
                        <Text style={styles.statusText}>Operando Normalmente</Text>
                    </View>
                    <Text style={styles.updateText}>Próximo veículo em 4 min</Text>
                </View>

                <View style={styles.itineraryContainer}>
                    <Text style={styles.sectionTitle}>Itinerário</Text>
                    {loading ? (
                        [1, 2, 3, 4, 5].map((i) => (
                            <View key={i} style={styles.stopRow}>
                                <Skeleton width={20} height={20} borderRadius={10} />
                                <View style={{ marginLeft: 15 }}>
                                    <Skeleton width={150} height={15} />
                                    <Skeleton width={80} height={10} marginTop={5} />
                                </View>
                            </View>
                        ))
                    ) : (
                        stops.map((stop, index) => (
                            <View key={stop.id} style={styles.stopRow}>
                                <View style={styles.timelineContainer}>
                                    <View style={[
                                        styles.line,
                                        index === 0 && { top: '50%' },
                                        index === stops.length - 1 && { height: '50%' },
                                        stop.status === 'past' ? styles.linePast : styles.lineFuture
                                    ]} />
                                    <View style={[
                                        styles.dot,
                                        stop.status === 'past' && styles.dotPast,
                                        stop.status === 'current' && styles.dotCurrent,
                                    ]} />
                                </View>
                                <View style={styles.stopInfo}>
                                    <Text style={[
                                        styles.stopName,
                                        stop.status === 'past' && styles.textPast
                                    ]}>{stop.name}</Text>
                                    <Text style={[
                                        styles.stopTime,
                                        stop.status === 'current' && { color: COLORS.success, fontWeight: 'bold' }
                                    ]}>{stop.time}</Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.actionButton}>
                    <MaterialCommunityIcons name="bell-outline" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Me avisar para descer</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        marginRight: 15,
    },
    headerInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 10,
    },
    badgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    statusCard: {
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    statusText: {
        color: COLORS.success,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    updateText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '600',
    },
    itineraryContainer: {
        paddingLeft: 10,
    },
    sectionTitle: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 20,
    },
    stopRow: {
        flexDirection: 'row',
        height: 60,
    },
    timelineContainer: {
        width: 30,
        alignItems: 'center',
    },
    line: {
        width: 2,
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
    linePast: {
        backgroundColor: COLORS.primary,
    },
    lineFuture: {
        backgroundColor: COLORS.border,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.border,
        marginTop: 6,
        zIndex: 1,
    },
    dotPast: {
        backgroundColor: COLORS.primary,
    },
    dotCurrent: {
        backgroundColor: COLORS.success,
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: 'white',
        marginTop: 4,
    },
    stopInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'flex-start',
    },
    stopName: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '600',
    },
    textPast: {
        color: COLORS.textSecondary,
    },
    stopTime: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginTop: 2,
    },
    footer: {
        padding: 20,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    actionButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
});

export default LineDetails;
