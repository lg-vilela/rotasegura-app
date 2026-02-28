import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import SavedPlaceItem from '@/src/components/SavedPlaceItem';
import COLORS from '@/src/constants/colors';
import api from '@/src/services/api';

const STORAGE_KEY = '@rotasegura_saved_places';

const DEFAULT_PLACES = [
    { id: 'home', title: 'Casa', icon: 'home', address: 'Toque para definir' },
    { id: 'work', title: 'Trabalho', icon: 'briefcase', address: 'Toque para definir' },
    { id: 'school', title: 'Escola / Univ', icon: 'school', address: 'Toque para definir' },
    { id: 'fav1', title: 'Academia', icon: 'star', address: 'Toque para definir' },
];

export default function SalvosScreen() {
    const [savedPlaces, setSavedPlaces] = useState(DEFAULT_PLACES);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPlace, setEditingPlace] = useState(null);
    const [newAddress, setNewAddress] = useState('');

    useEffect(() => {
        loadPlaces();
    }, []);

    const loadPlaces = async () => {
        try {
            const data = await api.getSavedPlaces();
            if (data != null) {
                setSavedPlaces(data);
            }
        } catch (e) {
            // Error handled by UI or silent
        }
    };

    const handleEditPlace = (place) => {
        setEditingPlace(place);
        setNewAddress(place.address === 'Toque para definir' ? '' : place.address);
        setIsModalVisible(true);
    };

    const handleSaveAddress = async () => {
        const updatedPlaces = savedPlaces.map(p =>
            p.id === editingPlace.id ? { ...p, address: newAddress || 'Toque para definir' } : p
        );

        try {
            await api.saveSavedPlaces(updatedPlaces);
            setSavedPlaces(updatedPlaces);
            setIsModalVisible(false);
        } catch (e) {
            // Error handled by UI or silent
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Seus Locais</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Favoritos</Text>
                {savedPlaces.map(place => (
                    <SavedPlaceItem
                        key={place.id}
                        title={place.title}
                        icon={place.icon}
                        address={place.address}
                        onPress={() => handleEditPlace(place)}
                    />
                ))}
            </ScrollView>

            {/* Edit Location Modal */}
            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <View style={styles.modalTitleRow}>
                                <MaterialCommunityIcons name={editingPlace?.icon} size={24} color={COLORS.primary} />
                                <Text style={styles.modalTitle}>Editar {editingPlace?.title}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <MaterialCommunityIcons name="close" size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBody}>
                            <Text style={styles.inputLabel}>Endereço Completo</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Ex: Av. Paulista, 1578"
                                placeholderTextColor="#64748b"
                                value={newAddress}
                                onChangeText={setNewAddress}
                                autoFocus
                            />
                            <Text style={styles.inputHint}>
                                Defina um endereço para receber alertas personalizados sobre esta região.
                            </Text>
                        </View>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSaveAddress}
                            >
                                <Text style={styles.saveButtonText}>Salvar Endereço</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: 20,
        paddingTop: 40,
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 28,
        fontWeight: '800',
    },
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 16,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        minHeight: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    modalTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    modalTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalBody: {
        marginBottom: 30,
    },
    inputLabel: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    textInput: {
        backgroundColor: COLORS.background,
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 20,
        color: COLORS.text,
        fontSize: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    inputHint: {
        color: COLORS.textSecondary,
        fontSize: 13,
        marginTop: 12,
        lineHeight: 18,
    },
    modalFooter: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cancelButtonText: {
        color: COLORS.textSecondary,
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        flex: 2,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
