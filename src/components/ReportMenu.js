import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';

const { width } = Dimensions.get('window');

const ReportMenu = forwardRef(({ onSelectCategory }, ref) => {
    const snapPoints = useMemo(() => ['45%'], []);

    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.6}
        />
    );

    const reportTypes = [
        { id: 'crowd', label: 'Lotação', icon: 'account-group', color: COLORS.primary, desc: 'Ônibus cheio' },
        { id: 'breakdown', label: 'Avaria', icon: 'bus-alert', color: COLORS.alert, desc: 'Problema técnico' },
        { id: 'ac', label: 'Ar / Clima', icon: 'air-conditioner', color: COLORS.success, desc: 'Temperatura' },
        { id: 'security', label: 'Segurança', icon: 'shield-alert', color: COLORS.critical, desc: 'Risco iminente' },
    ];

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: COLORS.surface }}
            handleIndicatorStyle={{ backgroundColor: '#475569', width: 40 }}
        >
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Novo Reporte</Text>
                    <Text style={styles.subtitle}>O que está acontecendo agora?</Text>
                </View>

                <View style={styles.grid}>
                    {reportTypes.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() => onSelectCategory(item.id)}
                        >
                            <View style={[styles.iconWrapper, { backgroundColor: item.color + '15' }]}>
                                <MaterialCommunityIcons name={item.icon} size={30} color={item.color} />
                            </View>
                            <View style={styles.textWrapper}>
                                <Text style={styles.label}>{item.label}</Text>
                                <Text style={styles.cardDesc}>{item.desc}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    header: {
        marginBottom: 24,
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 14,
        color: '#94a3b8',
        marginTop: 4,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: (width - 55) / 2,
        backgroundColor: '#1E293B',
        borderRadius: 20,
        padding: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        flexDirection: 'column',
        alignItems: 'flex-start',
        elevation: 2,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    textWrapper: {
        width: '100%',
    },
    label: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    },
    cardDesc: {
        color: '#64748b',
        fontSize: 12,
        marginTop: 2,
    }
});

export default ReportMenu;
