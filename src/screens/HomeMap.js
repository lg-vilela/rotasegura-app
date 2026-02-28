import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

// Components
import ActionButtons from '../components/ActionButtons';
import CustomMarker from '../components/CustomMarker';
import FilterChips from '../components/FilterChips';
import IncidentDetailCard from '../components/IncidentDetailCard';
import ReportMenu from '../components/ReportMenu';
import SearchBar from '../components/SearchBar';
import SOSModal from '../components/SOSModal';
import Toast from '../components/Toast';
import TransitCarousel from '../components/TransitCarousel';
import TransitSheet from '../components/TransitSheet';
import TransitStopMarker from '../components/TransitStopMarker';

// Constants & Services
import COLORS from '../constants/colors';
import MAP_STYLE from '../constants/mapStyle';
import api from '../services/api';

// Screens
import LineDetails from './LineDetails';
import ReportDetail from './ReportDetail';
import SuccessScreen from './SuccessScreen';

const HomeMap = () => {
    const toastRef = useRef(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedIncident, setSelectedIncident] = useState(null);

    // Reporting State
    const [reportingStep, setReportingStep] = useState('map'); // 'map', 'detail', 'success'
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Emergency State
    const [sosVisible, setSosVisible] = useState(false);

    const [activeFilter, setActiveFilter] = useState('all');

    // Navigation and Route State
    const [selectedLine, setSelectedLine] = useState(null);
    const [isCarouselVisible, setIsCarouselVisible] = useState(false);
    const [activeRoute, setActiveRoute] = useState(null);

    // Search State
    const [searchText, setSearchText] = useState('');
    const [destination, setDestination] = useState(null);

    const reportSheetRef = useRef(null);
    const transitSheetRef = useRef(null);
    const mapRef = useRef(null);

    const [incidents, setIncidents] = useState([]);
    const [stops, setStops] = useState([]);

    const getFilteredIncidents = () => {
        if (activeFilter === 'all') return incidents;
        if (activeFilter === 'critical') return incidents.filter(i => i.type === 'Segurança');
        if (activeFilter === 'delays') return incidents.filter(i => i.type === 'Avaria' || i.type === 'Lotação');
        if (activeFilter === 'safe') return incidents.filter(i => i.type === 'Seguro');
        return incidents;
    };

    const getMarkerColor = (type) => {
        if (type === 'Avaria' || type === 'Segurança') return '#EF4444'; // Vermelho
        if (type === 'Lotação') return '#FBBF24'; // Amarelo
        if (type === 'Seguro') return COLORS.success; // Verde
        return COLORS.primary;
    };

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Acesso negado');
                    setLoading(false);
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
                setLocation(currentLocation.coords);

                // Fetch mocks from API service
                const [incidentsData, stopsData] = await Promise.all([
                    api.getIncidents(),
                    api.getStops()
                ]);
                setIncidents(incidentsData);
                setStops(stopsData);

                setLoading(false);
            } catch (error) {
                setErrorMsg('Erro ao inicializar o mapa');
                setLoading(false);
            }
        })();
    }, []);

    const handleOpenReport = () => {
        reportSheetRef.current?.expand();
    };

    const handleSelectCategory = (category) => {
        reportSheetRef.current?.close();
        setSelectedCategory(category);
        setReportingStep('detail');
    };

    const handleSendReport = async (reportData) => {
        try {
            await api.sendReport(reportData);
            setReportingStep('success');
            toastRef.current?.show('Reporte enviado com sucesso!', 'success');
        } catch (error) {
            toastRef.current?.show('Erro ao enviar reporte. Tente novamente.', 'error');
        }
    };

    const resetFlow = () => {
        setReportingStep('map');
        setSelectedCategory(null);
    };

    const handleSearch = () => {
        if (!searchText) return;

        // Mock Search: Se digitar "Paulista", move para lá
        let newRegion = null;
        if (searchText.toLowerCase().includes('paulista')) {
            newRegion = { latitude: -23.5611, longitude: -46.6558 };
        } else if (searchText.toLowerCase().includes('sé') || searchText.toLowerCase().includes('se')) {
            newRegion = { latitude: -23.5505, longitude: -46.6333 };
        } else {
            // Fake result próximo ao usuário
            newRegion = {
                latitude: location?.latitude + 0.01 || -23.54,
                longitude: location?.longitude + 0.01 || -46.63
            };
        }

        setDestination({
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
            title: searchText
        });

        mapRef.current?.animateToRegion({
            ...newRegion,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }, 1000);
    };

    const handleStopPress = (stop) => {
        transitSheetRef.current?.snapToIndex(1); // Abre na metade
    };

    const handleSelectLine = (line) => {
        setSelectedLine(line);
        // Mock de rota: Linha entre os pontos simulados
        setActiveRoute([
            { latitude: -23.5515, longitude: -46.6350 }, // Parada Sé
            { latitude: -23.5600, longitude: -46.6580 }, // MASP
            { latitude: -23.5620, longitude: -46.6540 }, // Gazeta
        ]);

        // Foca o mapa na rota
        mapRef.current?.animateToRegion({
            latitude: -23.556,
            longitude: -46.645,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
        }, 1000);
    };

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
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={MAP_STYLE}
                initialRegion={{
                    latitude: location ? location.latitude : -23.5505,
                    longitude: location ? location.longitude : -46.6333,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation={true}
                showsMyLocationButton={false}
                onPress={() => setSelectedIncident(null)}
            >
                {getFilteredIncidents().map(incident => (
                    <CustomMarker
                        key={incident.id}
                        coordinate={{ latitude: incident.lat, longitude: incident.lng }}
                        type={incident.type}
                        color={getMarkerColor(incident.type)}
                        onPress={() => setSelectedIncident(incident)}
                    />
                ))}

                {destination && (
                    <CustomMarker
                        coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                        type="Destino"
                        color={COLORS.primary}
                    />
                )}

                {stops.map((stop) => (
                    <TransitStopMarker
                        key={stop.id}
                        stop={stop}
                        onPress={() => handleStopPress(stop)}
                    />
                ))}

                {activeRoute && (
                    <Polyline
                        coordinates={activeRoute}
                        strokeColor={selectedLine?.color || COLORS.primary}
                        strokeWidth={4}
                    />
                )}
            </MapView>

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
                            onSubmit={handleSearch}
                        />
                    </View>
                </View>
                <View style={styles.filtersWrapper}>
                    <FilterChips activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                </View>
            </SafeAreaView>

            <View style={styles.bottomContainer}>
                {selectedIncident && (
                    <IncidentDetailCard
                        incident={selectedIncident}
                        onClose={() => setSelectedIncident(null)}
                    />
                )}
            </View>

            <ActionButtons onPress={handleOpenReport} />

            <TouchableOpacity
                style={styles.stationsToggleButton}
                onPress={() => setIsCarouselVisible(true)}
            >
                <MaterialCommunityIcons name="bus-stop-uncovered" size={24} color="white" />
                <Text style={styles.stationsToggleText}>Estações</Text>
            </TouchableOpacity>

            {isCarouselVisible && (
                <TransitCarousel
                    userLocation={location}
                    onClose={() => setIsCarouselVisible(false)}
                />
            )}

            <TransitSheet
                forwardRef={transitSheetRef}
                onSelectLine={handleSelectLine}
            />

            <ReportMenu ref={reportSheetRef} onSelectCategory={handleSelectCategory} />

            {/* Emergency Modal */}
            <SOSModal
                visible={sosVisible}
                onClose={() => setSosVisible(false)}
                location={location}
            />

            {/* Reporting Modals */}
            <Modal visible={reportingStep === 'detail'} animationType="slide">
                <ReportDetail
                    type={selectedCategory}
                    onBack={resetFlow}
                    onSend={handleSendReport}
                />
            </Modal>

            <Modal visible={reportingStep === 'success'} animationType="fade">
                <SuccessScreen
                    onBackToMap={resetFlow}
                    onSeeReport={resetFlow}
                />
            </Modal>

            <Modal visible={!!selectedLine} animationType="slide">
                <LineDetails
                    line={selectedLine}
                    onBack={() => {
                        setSelectedLine(null);
                        setActiveRoute(null);
                    }}
                />
            </Modal>

            {errorMsg && (
                <View style={[styles.errorBanner, { top: 100 }]}>
                    <Text style={styles.errorText}>{errorMsg}</Text>
                </View>
            )}
            <Toast ref={toastRef} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    map: {
        width: '100%',
        height: '100%',
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
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        zIndex: 10,
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
    bottomContainer: {
        position: 'absolute',
        bottom: 110, // Above the FAB and Tab Bar roughly
        left: 0,
        right: 0,
        zIndex: 10,
    },
    errorBanner: {
        position: 'absolute',
        left: 20,
        right: 20,
        backgroundColor: COLORS.critical + 'EE',
        padding: 12,
        borderRadius: 12,
        zIndex: 20,
    },
    errorText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    stationsToggleButton: {
        position: 'absolute',
        bottom: 120,
        right: 20,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 10,
    },
    stationsToggleText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 14,
    },
});


export default HomeMap;
