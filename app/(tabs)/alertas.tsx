import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import EmptyState from '@/src/components/EmptyState';
import IncidentCard from '@/src/components/IncidentCard';
import Skeleton from '@/src/components/Skeleton';
import COLORS from '@/src/constants/colors';
import api from '@/src/services/api';

export default function AlertasScreen() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await api.getAlerts();
            setAlerts(data);
        } catch (error) {
            // Error handled by UI or silent
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const data = await api.getAlerts();
            setAlerts(data);
        } catch (error) {
            // Error handled by UI or silent
        } finally {
            setRefreshing(false);
        }
    };

    const renderSkeletons = () => (
        <View>
            {[1, 2, 3].map(i => (
                <View key={i} style={styles.skeletonCard}>
                    <Skeleton width={40} height={40} borderRadius={20} />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <Skeleton width="60%" height={16} style={{ marginBottom: 10 }} />
                        <Skeleton width="90%" height={12} style={{ marginBottom: 6 }} />
                        <Skeleton width="40%" height={12} />
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Alertas Próximos</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="filter-variant" size={24} color={COLORS.textSecondary} />
                </TouchableOpacity>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
                }
            >
                {loading ? (
                    renderSkeletons()
                ) : alerts.length > 0 ? (
                    alerts.map(alert => (
                        <IncidentCard key={alert.id} incident={alert} />
                    ))
                ) : (
                    <EmptyState
                        icon="shield-check-outline"
                        title="Tudo limpo por aqui!"
                        description="Nenhuma ocorrência nas últimas 24h. Continue colaborando para manter sua rota segura."
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: '800',
    },
    scrollContent: {
        padding: 20,
    },
    skeletonCard: {
        backgroundColor: COLORS.surface + '80',
        padding: 15,
        borderRadius: 16,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    }
});
