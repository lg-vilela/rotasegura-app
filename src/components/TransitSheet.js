import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';

const TransitSheet = ({ forwardRef, onSelectLine }) => {
    const snapPoints = useMemo(() => ['15%', '50%', '90%'], []);

    const mockLines = [
        { id: '1', line: '875P-10', name: 'Lapa - Metrô Ana Rosa', time: '2 min', type: 'bus', color: COLORS.bus },
        { id: '2', line: '702U-10', name: 'Butantã - Term. Sto. Amaro', time: '5 min', type: 'bus', color: '#10B981' },
        { id: '3', line: 'L1', name: 'Linha 1 - Azul (Sentido Jabaquara)', time: '3 min', type: 'train', color: COLORS.subway },
        { id: '4', line: '917M-10', name: 'Vila Penteado - Metrô Ana Rosa', time: '12 min', type: 'bus', color: COLORS.bus },
        { id: '5', line: '805L-10', name: 'Term. Princesa Isabel - Aclimação', time: '15 min', type: 'bus', color: '#F59E0B' },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onSelectLine(item)}
        >
            <View style={[styles.lineBadge, { backgroundColor: item.color }]}>
                <Text style={styles.lineText}>{item.line}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.nameText} numberOfLines={1}>{item.name}</Text>
                <View style={styles.typeRow}>
                    <MaterialCommunityIcons
                        name={item.type === 'bus' ? 'bus' : 'train'}
                        size={14}
                        color={COLORS.textSecondary}
                    />
                    <Text style={styles.typeText}>{item.type === 'bus' ? 'Ônibus' : 'Metrô'}</Text>
                </View>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <BottomSheet
            ref={forwardRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={styles.sheetBackground}
            handleIndicatorStyle={styles.indicator}
        >
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Próximos em Sua Localização</Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="refresh" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <BottomSheetFlatList
                    data={mockLines}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    sheetBackground: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    indicator: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: 40,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContent: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    lineBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        minWidth: 70,
        alignItems: 'center',
    },
    lineText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 15,
    },
    nameText: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    typeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginLeft: 4,
    },
    timeContainer: {
        alignItems: 'flex-end',
    },
    timeText: {
        color: COLORS.success,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TransitSheet;
