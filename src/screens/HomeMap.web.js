import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import FilterChips from '../components/FilterChips';
import IncidentDetailCard from '../components/IncidentDetailCard';
import SearchBar from '../components/SearchBar';
import COLORS from '../constants/colors';
import api from '../services/api';

const HomeMap = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status === 'granted') {
                    const currentLocation = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                    });
                    setLocation(currentLocation.coords);
                }

                const incidentsData = await api.getIncidents();
                setIncidents(incidentsData);
            } catch {
                setErrorMsg('Não foi possível carregar o mapa no navegador.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const getFilteredIncidents = () => {
        if (activeFilter === 'all') return incidents;
        if (activeFilter === 'critical') return incidents.filter((item) => item.type === 'Segurança');
        if (activeFilter === 'delays') return incidents.filter((item) => item.type === 'Avaria' || item.type === 'Lotação');
        if (activeFilter === 'safe') return incidents.filter((item) => item.type === 'Seguro');
        return incidents;
    };

    const visibleIncidents = getFilteredIncidents().filter((item) => {
        if (!searchText.trim()) return true;
        const term = searchText.toLowerCase();
        const title = (item.title || '').toLowerCase();
        const desc = (item.description || '').toLowerCase();
        return title.includes(term) || desc.includes(term) || item.type.toLowerCase().includes(term);
    });

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Sincronizando RotaSegura...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                <View style={styles.headerRow}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.headerLogo}
                        contentFit="contain"
                    />
                    <View style={styles.searchWrapper}>
                        <SearchBar
                            value={searchText}
                            onChangeText={setSearchText}
                            onSubmit={() => {}}
                        />
                    </View>
                </View>
                <View style={styles.filtersWrapper}>
                    <FilterChips activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                </View>
            </SafeAreaView>

            <View style={styles.mapFallback}>
                <MaterialCommunityIcons name="map-search-outline" size={34} color={COLORS.primary} />
                <Text style={styles.mapFallbackTitle}>Visualização simplificada no navegador</Text>
                <Text style={styles.mapFallbackSubtitle}>
                    Abra no Android/iOS para ver o mapa interativo completo.
                </Text>
                {location && (
                    <Text style={styles.locationText}>
                        Sua localização: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </Text>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.listContent}>
                {selectedIncident ? (
                    <IncidentDetailCard
                        incident={selectedIncident}
                        onClose={() => setSelectedIncident(null)}
                    />
                ) : visibleIncidents.length ? (
                    visibleIncidents.map((incident) => (
                        <TouchableOpacity
                            key={incident.id}
                            style={styles.incidentCard}
                            onPress={() => setSelectedIncident(incident)}
                        >
                            <Text style={styles.incidentType}>{incident.type}</Text>
                            <Text style={styles.incidentTitle}>{incident.title}</Text>
                            <Text style={styles.incidentDescription} numberOfLines={2}>
                                {incident.description}
                            </Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Nenhum alerta encontrado.</Text>
                    </View>
                )}
            </ScrollView>

            {errorMsg && (
                <View style={styles.errorBanner}>
                    <Text style={styles.errorText}>{errorMsg}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    loadingText: {
        marginTop: 10,
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '600',
    },
    topContainer: {
        paddingTop: 10,
    },
    searchWrapper: {
        flex: 1,
        paddingRight: 20,
        marginBottom: 15,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    headerLogo: {
        width: 40,
        height: 40,
        marginRight: 5,
        marginBottom: 15,
    },
    filtersWrapper: {
        paddingLeft: 15,
    },
    mapFallback: {
        marginHorizontal: 16,
        marginTop: 10,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    mapFallbackTitle: {
        marginTop: 8,
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
    },
    mapFallbackSubtitle: {
        marginTop: 4,
        color: COLORS.textSecondary,
        fontSize: 12,
        textAlign: 'center',
    },
    locationText: {
        marginTop: 8,
        color: COLORS.text,
        fontSize: 12,
    },
    listContent: {
        padding: 16,
        paddingBottom: 28,
        gap: 10,
    },
    incidentCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 12,
    },
    incidentType: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '700',
    },
    incidentTitle: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '700',
        marginTop: 4,
    },
    incidentDescription: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginTop: 4,
    },
    emptyState: {
        marginTop: 10,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.textSecondary,
    },
    errorBanner: {
        position: 'absolute',
        left: 20,
        right: 20,
        top: 100,
        backgroundColor: COLORS.critical + 'EE',
        padding: 12,
        borderRadius: 12,
    },
    errorText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default HomeMap;
